#!/usr/bin/env python3
"""
Simple HTTP server for AEGIS NET AI predictions (Fallback)
This runs without FastAPI dependencies for quick testing
"""

import json
import math
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import sys

class AIRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "status": "healthy",
                "timestamp": datetime.now().isoformat(),
                "service": "AEGIS AI Service (Simple)",
                "version": "1.0.0"
            }
            self.wfile.write(json.dumps(response).encode())
            
        elif self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "message": "AEGIS NET AI Service",
                "status": "operational",
                "version": "1.0.0",
                "endpoints": ["/predict", "/health", "/"]
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found"}).encode())

    def do_POST(self):
        if self.path == '/predict':
            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                
                # Generate mock predictions
                predictions = self.generate_predictions(data)
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                self.wfile.write(json.dumps(predictions).encode())
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found"}).encode())

    def generate_predictions(self, data):
        """Generate mock AI predictions"""
        asteroid_data = data.get('asteroid_data', {})
        
        diameter = asteroid_data.get('diameter', 150)
        velocity = asteroid_data.get('velocity', 15.2)
        
        # Calculate blast radius (simplified)
        blast_radius = math.sqrt(diameter * velocity) * 0.5
        
        # Determine risk level
        risk_level = "low"
        if blast_radius > 20:
            risk_level = "high"
        elif blast_radius > 10:
            risk_level = "medium"
        
        return {
            "blast_prediction": {
                "blast_radius": round(blast_radius, 2),
                "thermal_radius": round(blast_radius * 1.5, 2),
                "seismic_radius": round(blast_radius * 2.0, 2),
                "airburst_height": round(max(0, diameter / 100), 2)
            },
            "tsunami_prediction": {
                "tsunami_risk": blast_radius > 15,
                "wave_height": round(min(diameter / 10, 50), 1) if blast_radius > 15 else None,
                "coastal_impact_radius": round(blast_radius * 3, 1) if blast_radius > 15 else None
            },
            "debris_dispersion": {
                "dispersion_radius": round(blast_radius * 2.5, 2),
                "debris_size_distribution": {
                    "large": 0.1,
                    "medium": 0.3,
                    "small": 0.6
                },
                "impact_probability_map": [[0.8, 0.6, 0.4, 0.2], [0.6, 0.9, 0.7, 0.3], [0.4, 0.7, 1.0, 0.5], [0.2, 0.3, 0.5, 0.3]]
            },
            "evacuation_routes": [
                {
                    "route_id": "route_1",
                    "name": "Primary Evacuation Route",
                    "waypoints": [[40.7128, -74.0060], [40.7589, -73.9851]],
                    "distance": 15.2,
                    "estimated_time": 25.0,
                    "traffic_level": "light",
                    "safety_score": 0.9,
                    "capacity": 1000
                },
                {
                    "route_id": "route_2", 
                    "name": "Secondary Evacuation Route",
                    "waypoints": [[40.7128, -74.0060], [40.7829, -73.9654]],
                    "distance": 18.7,
                    "estimated_time": 35.0,
                    "traffic_level": "medium",
                    "safety_score": 0.7,
                    "capacity": 800
                }
            ],
            "risk_assessment": {
                "risk_level": risk_level,
                "risk_factors": ["Large blast radius"] if blast_radius > 20 else ["Moderate blast radius"] if blast_radius > 10 else ["Small blast radius"],
                "recommendations": ["Immediate evacuation required"] if risk_level == "high" else ["Prepare for evacuation"] if risk_level == "medium" else ["Monitor situation"],
                "confidence_score": 0.85
            },
            "resource_allocation": {
                "shelters_needed": max(1, int(blast_radius * 20)),
                "hospitals_needed": max(1, int(blast_radius * 10)),
                "evacuation_centers_needed": max(1, int(blast_radius * 5)),
                "estimated_evacuees": int(min(blast_radius * 1000, 100000)),
                "resource_shortage_risk": "high" if blast_radius > 25 else "medium" if blast_radius > 15 else "low"
            },
            "processing_time": 0.1
        }

    def log_message(self, format, *args):
        """Override to reduce log noise"""
        pass

def run_server(port=8000):
    """Run the simple HTTP server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, AIRequestHandler)
    print(f"🚀 AEGIS AI Service (Simple) running on http://localhost:{port}")
    print(f"📊 Health check: http://localhost:{port}/health")
    print(f"🤖 Predictions: http://localhost:{port}/predict")
    print("Press Ctrl+C to stop")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
        httpd.server_close()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run_server(port)
