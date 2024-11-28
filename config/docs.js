module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'SIH Backend API Documentation',
      version: '1.0.0',
      description: 'Complete API documentation for SIH backend services.',
      contact: {
        name: 'SIH Support',
        email: 'sih.pravaah@gmail.com'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://sih-pravaah.onrender.com'
          : `http://localhost:${process.env.PORT || 5000}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'x-auth-token',
          in: 'header',
          description: 'JWT token required for authentication. Provide it in the `x-auth-token` header.'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User ID'
            },
            username: {
              type: 'string',
              description: 'Username'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              default: false
            },
            message: {
              type: 'string'
            },
            error: {
              type: 'string'
            }
          }
        },
        Itinerary: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            location: { type: 'string' },
            hotels: {
              type: 'array',
              items: { $ref: '#/components/schemas/Hotel' }
            },
            tourist_spots: {
              type: 'array',
              items: { $ref: '#/components/schemas/TouristSpot' }
            },
            restaurants: {
              type: 'array',
              items: { $ref: '#/components/schemas/Restaurant' }
            },
            market_places: {
              type: 'array',
              items: { $ref: '#/components/schemas/Marketplace' }
            },
            createdAt: { type: 'string', format: 'date-time' },
            lastUpdated: { type: 'string', format: 'date-time' }
          }
        },
        ItineraryInput: {
          type: 'object',
          required: ['location'],
          properties: {
            location: { type: 'string' },
            hotels: {
              type: 'array',
              items: { $ref: '#/components/schemas/HotelInput' }
            },
            tourist_spots: {
              type: 'array',
              items: { $ref: '#/components/schemas/TouristSpotInput' }
            },
            restaurants: {
              type: 'array',
              items: { $ref: '#/components/schemas/RestaurantInput' }
            },
            market_places: {
              type: 'array',
              items: { $ref: '#/components/schemas/MarketplaceInput' }
            }
          }
        },
        Hotel: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            map_url: { type: 'string' },
            image_url: { type: 'string' },
            ratings: { type: 'number' }
          }
        },
        HotelInput: {
          type: 'object',
          required: ['name', 'address', 'map_url', 'image_url', 'ratings'],
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            map_url: { type: 'string' },
            image_url: { type: 'string' },
            ratings: { type: 'number' }
          }
        },
        TouristSpot: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            map_url: { type: 'string' },
            image_url: { type: 'string' },
            ratings: { type: 'number' }
          }
        },
        TouristSpotInput: {
          type: 'object',
          required: ['name', 'address', 'map_url', 'image_url', 'ratings'],
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            map_url: { type: 'string' },
            image_url: { type: 'string' },
            ratings: { type: 'number' }
          }
        },
        Restaurant: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            map_url: { type: 'string' },
            image_url: { type: 'string' },
            ratings: { type: 'number' }
          }
        },
        RestaurantInput: {
          type: 'object',
          required: ['name', 'address', 'map_url', 'image_url', 'ratings'],
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            map_url: { type: 'string' },
            image_url: { type: 'string' },
            ratings: { type: 'number' }
          }
        },
        Marketplace: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            map_url: { type: 'string' },
            image_url: { type: 'string' },
            ratings: { type: 'number' }
          }
        },
        MarketplaceInput: {
          type: 'object',
          required: ['name', 'address', 'map_url', 'image_url', 'ratings'],
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            map_url: { type: 'string' },
            image_url: { type: 'string' },
            ratings: { type: 'number' }
          }
        },
        Station: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            location: { type: 'string' },
            facilities: {
              type: 'array',
              items: { $ref: '#/components/schemas/Facility' }
            },
            connections: {
              type: 'array',
              items: { $ref: '#/components/schemas/Connection' }
            },
            createdAt: { type: 'string', format: 'date-time' },
            lastUpdated: { type: 'string', format: 'date-time' }
          }
        },
        StationInput: {
          type: 'object',
          required: ['name', 'location'],
          properties: {
            name: { type: 'string' },
            location: { type: 'string' },
            facilities: {
              type: 'array',
              items: { $ref: '#/components/schemas/FacilityInput' }
            },
            connections: {
              type: 'array',
              items: { $ref: '#/components/schemas/ConnectionInput' }
            }
          }
        },
        Facility: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            description: { type: 'string' }
          }
        },
        FacilityInput: {
          type: 'object',
          required: ['type', 'description'],
          properties: {
            type: { type: 'string' },
            description: { type: 'string' }
          }
        },
        Connection: {
          type: 'object',
          properties: {
            line: { type: 'string' },
            destination: { type: 'string' },
            duration: { type: 'number' }
          }
        },
        ConnectionInput: {
          type: 'object',
          required: ['line', 'destination', 'duration'],
          properties: {
            line: { type: 'string' },
            destination: { type: 'string' },
            duration: { type: 'number' }
          }
        }
      }
    },
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Authentication'],
          summary: 'Register a new user',
          description: 'Create a new user account with username, email, and password',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['username', 'email', 'password'],
                  properties: {
                    username: {
                      type: 'string',
                      minLength: 2,
                      example: 'johndoe'
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'john@example.com'
                    },
                    password: {
                      type: 'string',
                      format: 'password',
                      minLength: 6,
                      example: 'Password123',
                      description: 'Must be at least 6 characters and contain a number'
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'User registered successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      token: {
                        type: 'string',
                        description: 'JWT authentication token'
                      },
                      user: {
                        $ref: '#/components/schemas/User'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Validation error or user already exists',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  },
                  example: {
                    success: false,
                    message: 'User with this email already exists'
                  }
                }
              }
            }
          }
        }
      },
      '/api/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'Login user',
          description: 'Authenticate user with email and password',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'john@example.com'
                    },
                    password: {
                      type: 'string',
                      format: 'password',
                      example: 'Password123'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      token: {
                        type: 'string',
                        description: 'JWT authentication token'
                      },
                      user: {
                        $ref: '#/components/schemas/User'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  },
                  example: {
                    success: false,
                    message: 'Invalid credentials'
                  }
                }
              }
            }
          }
        }
      },
      '/api/auth/forgot-password': {
        post: {
          tags: ['Authentication'],
          summary: 'Request password reset',
          description: 'Send a password reset link to user\'s email',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email'],
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'john@example.com'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Password reset email sent successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      message: {
                        type: 'string',
                        example: 'Password reset email sent'
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  },
                  example: {
                    success: false,
                    message: 'No user found with that email'
                  }
                }
              }
            },
            429: {
              description: 'Too many requests',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  },
                  example: {
                    success: false,
                    message: 'Too many password reset attempts. Please try again after an hour'
                  }
                }
              }
            }
          }
        }
      },
      '/api/auth/reset-password/{resetToken}': {
        post: {
          tags: ['Authentication'],
          summary: 'Reset password',
          description: 'Reset user password using reset token',
          parameters: [
            {
              name: 'resetToken',
              in: 'path',
              required: true,
              description: 'Password reset token received via email',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['password'],
                  properties: {
                    password: {
                      type: 'string',
                      format: 'password',
                      minLength: 6,
                      example: 'NewPassword123',
                      description: 'Must be at least 6 characters and contain a number'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Password reset successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      message: {
                        type: 'string',
                        example: 'Password reset successful'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid or expired reset token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  },
                  example: {
                    success: false,
                    message: 'Invalid or expired reset token'
                  }
                }
              }
            },
            429: {
              description: 'Too many requests',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  },
                  example: {
                    success: false,
                    message: 'Too many requests. Please try again later'
                  }
                }
              }
            }
          }
        }
      },
      '/api/itineraries/search/{location}': {
        get: {
          tags: ['Itineraries'],
          summary: 'Search itineraries by location',
          description: 'Retrieve an itinerary based on the specified location.',
          parameters: [
            {
              name: 'location',
              in: 'path',
              required: true,
              description: 'Location to search for itineraries',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            200: {
              description: 'Itinerary found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/Itinerary' }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Itinerary not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Itinerary not found'
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Server Error',
                    error: 'Error message'
                  }
                }
              }
            }
          }
        }
      },
      '/api/itineraries': {
        post: {
          tags: ['Itineraries'],
          summary: 'Add or update an itinerary',
          description: 'Create a new itinerary or update an existing one based on location.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ItineraryInput' }
              }
            }
          },
          responses: {
            201: {
              description: 'Itinerary created or updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/Itinerary' }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid data',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Invalid data',
                    error: 'Error message'
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Server Error',
                    error: 'Error message'
                  }
                }
              }
            }
          }
        }
      },
      '/api/stations/search/{name}': {
        get: {
          tags: ['Stations'],
          summary: 'Search stations by name',
          description: 'Retrieve a station based on the specified name.',
          parameters: [
            {
              name: 'name',
              in: 'path',
              required: true,
              description: 'Name of the station to search for',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            200: {
              description: 'Station found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/Station' }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Station not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Station not found'
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Server Error',
                    error: 'Error message'
                  }
                }
              }
            }
          }
        }
      },
      '/api/stations': {
        post: {
          tags: ['Stations'],
          summary: 'Add or update a station',
          description: 'Create a new station or update an existing one based on name.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StationInput' }
              }
            }
          },
          responses: {
            201: {
              description: 'Station created or updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/Station' }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid data',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Invalid data',
                    error: 'Error message'
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Server Error',
                    error: 'Error message'
                  }
                }
              }
            }
          }
        }
      },
      '/api/users/me': {
        get: {
          tags: ['Authentication'],
          summary: 'Get Current User',
          description: 'Retrieve the information of the currently authenticated user.',
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            200: {
              description: 'User retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Unauthorized. Please provide a valid token.'
                  }
                }
              }
            },
            404: {
              description: 'User Not Found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'User not found'
                  }
                }
              }
            },
            500: {
              description: 'Server Error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Server Error',
                    error: 'Detailed error message'
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Authentication'],
          summary: 'Update Current User',
          description: 'Update the profile information of the currently authenticated user.',
          security: [
            {
              bearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                      example: 'newusername'
                    }
                    // Add other fields that can be updated
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'User updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      user: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Unauthorized. Please provide a valid token.'
                  }
                }
              }
            },
            500: {
              description: 'Server Error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    message: 'Server Error',
                    error: 'Detailed error message'
                  }
                }
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'API endpoints for user authentication and profile management'
      },
      {
        name: 'Itineraries',
        description: 'API endpoints for managing itineraries'
      },
      {
        name: 'Stations',
        description: 'API endpoints for managing stations'
      }
    ]
  };