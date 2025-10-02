// Google Maps API TypeScript declarations
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          PlacesService: new (element: HTMLElement) => {
            textSearch: (
              request: {
                query: string
                fields: string[]
              },
              callback: (
                results: Array<{
                  name?: string
                  formatted_address?: string
                  geometry?: {
                    location?: {
                      lat(): number
                      lng(): number
                    }
                  }
                  place_id?: string
                }> | null,
                status: string
              ) => void
            ) => void
          }
          PlacesServiceStatus: {
            OK: string
            ZERO_RESULTS: string
            OVER_QUERY_LIMIT: string
            REQUEST_DENIED: string
            INVALID_REQUEST: string
            UNKNOWN_ERROR: string
          }
        }
      }
    }
  }
}

export {}
