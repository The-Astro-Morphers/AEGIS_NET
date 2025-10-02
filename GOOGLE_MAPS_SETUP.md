# Google Maps API Setup Guide

## Overview
This guide will help you set up Google Maps API for enhanced location search functionality in the AEGIS GUIDE interface.

## Prerequisites
- Google Cloud Platform account
- AEGIS NET project running locally

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `AEGIS-NET-Location-Search`
4. Click "Create"

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for and enable these APIs:
   - **Places API** (for location search)
   - **Maps JavaScript API** (for map functionality)

## Step 3: Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key

## Step 4: Secure Your API Key (Recommended)

1. Click on your API key to edit it
2. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add your domains:
     - `http://localhost:3000/*`
     - `http://localhost:3001/*`
     - `http://localhost:3002/*`
     - `https://yourdomain.com/*` (for production)
3. Under "API restrictions":
   - Select "Restrict key"
   - Choose: "Places API" and "Maps JavaScript API"
4. Click "Save"

## Step 5: Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Add your Google Maps API key to `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

## Step 6: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/guide`

3. Check the status indicator:
   - ✅ Green: "Google Maps API loaded - Enhanced search available"
   - ⏳ Yellow: "Loading Google Maps API..."

4. Test the search:
   - Type any address (e.g., "Times Square, New York")
   - Click Search or press Enter
   - You should see real Google Places results

## Features

### Enhanced Search Capabilities
- **Real-time search**: Search any address worldwide
- **Autocomplete suggestions**: Google's intelligent suggestions
- **Accurate coordinates**: Precise latitude/longitude
- **Formatted addresses**: Standardized address formatting
- **Place IDs**: Unique identifiers for places

### Fallback System
- **Mock data**: If Google Maps API fails to load
- **IP geolocation**: Alternative location detection
- **Graceful degradation**: App works even without API key

## Troubleshooting

### API Key Issues
- **Error**: "This API project is not authorized"
  - **Solution**: Enable Places API and Maps JavaScript API
- **Error**: "Referer not allowed"
  - **Solution**: Add your domain to API key restrictions
- **Error**: "API key not valid"
  - **Solution**: Check if API key is correctly set in `.env.local`

### Loading Issues
- **Status shows "Loading..."**: Check browser console for errors
- **No results**: Verify API key has Places API enabled
- **CORS errors**: Ensure API key restrictions include your domain

### Development Tips
- Use browser developer tools to check console logs
- Monitor Google Cloud Console for API usage
- Check network tab for failed API requests

## Cost Considerations

### Free Tier Limits
- **Places API**: $200 free credit per month
- **Maps JavaScript API**: $200 free credit per month
- **Text Search**: $32 per 1,000 requests (after free tier)

### Usage Optimization
- Results are cached to reduce API calls
- Mock data fallback reduces unnecessary requests
- API key restrictions prevent unauthorized usage

## Production Deployment

1. **Update API key restrictions**:
   - Add your production domain
   - Remove localhost restrictions

2. **Monitor usage**:
   - Set up billing alerts
   - Monitor API quotas

3. **Security**:
   - Use environment variables
   - Never commit API keys to version control

## Support

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Places API Reference](https://developers.google.com/maps/documentation/places/web-service)
- [Maps JavaScript API Reference](https://developers.google.com/maps/documentation/javascript)

---

**Note**: This integration provides professional-grade location search capabilities while maintaining fallback options for development and testing.
