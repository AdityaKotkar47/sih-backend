module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Pravaah API Documentation',
      version: '1.0.0',
      description: 'Complete API documentation for Pravaah authentication and user management',
      contact: {
        name: 'Pravaah Support',
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
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
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
            }
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
        description: 'API endpoints for user authentication and password management'
      }
    ]
  };