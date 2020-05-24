export const siteSchema = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "definitions": {
    "section": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "background": {
          "type": "object",
          "required": [],
          "properties": {
            "color": {
              "type": "string"
            }
          }
        }
      },
      "required": [
        "type"
      ]
    }
  },
  "type": "object",
  "required": [
    "name",
    "tagline",
    "company",
    "sections"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "tagline": {
      "type": "string"
    },
    "company": {
      "type": "string"
    },
    "companyUrl": {
      "type": "string"
    },
    "version": {
      "type": "string"
    },
    "keywords": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "sections": {
      "type": "array",
      "items": {
        "anyOf": [
          {
            "title": "navbar-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "navbar-1"
              },
              "logoImageUrl": {
                "type": "string"
              },
              "shouldStickToTop": {
                "type": "boolean"
              }
            },
            "required": [
            ]
          },
          {
            "title": "hero-simple-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "hero-simple-1"
              },
              "logoImageUrl": {
                "type": "null"
              },
              "titleText": {
                "type": "string"
              },
              "subtitleText": {
                "type": "string"
              }
            },
            "required": [
              "titleText"
            ]
          },
          {
            "title": "hero-signup-image-half-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "hero-signup-image-half-1"
              },
              "logoImageUrl": {
                "type": "null"
              },
              "titleText": {
                "type": "string"
              },
              "subtitleText": {
                "type": "string"
              },
              "inputType": {
                "type": "string"
              },
              "inputPlaceholderText": {
                "type": "string"
              },
              "inputButtonText": {
                "type": "string"
              },
              "inputSuccessMessageText": {
                "type": "null"
              },
              "leftImageUrl": {
                "type": "string"
              },
              "rightImageUrl": {
                "type": "null"
              },
              "inputName": {
                "type": "string"
              },
              "formTarget": {
                "type": "string"
              },
              "formAction": {
                "type": "string"
              }
            },
            "required": [
              "logoImageUrl",
              "titleText",
              "subtitleText",
              "background",
              "inputType",
              "inputPlaceholderText",
              "inputButtonText",
              "inputSuccessMessageText",
              "leftImageUrl",
              "rightImageUrl",
              "inputName",
              "formTarget",
              "formAction"
            ]
          },
          {
            "title": "hero-signup-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "hero-signup-1"
              },
              "logoImageUrl": {
                "type": "null"
              },
              "titleText": {
                "type": "string"
              },
              "subtitleText": {
                "type": "string"
              },
              "inputType": {
                "type": "string"
              },
              "inputPlaceholderText": {
                "type": "string"
              },
              "inputButtonText": {
                "type": "string"
              },
              "inputSuccessMessageText": {
                "type": "null"
              },
              "inputName": {
                "type": "string"
              },
              "formTarget": {
                "type": "string"
              },
              "formAction": {
                "type": "string"
              }
            },
            "required": [
              "logoImageUrl",
              "titleText",
              "subtitleText",
              "inputType",
              "inputPlaceholderText",
              "inputButtonText",
              "inputSuccessMessageText",
              "inputName",
              "formTarget",
              "formAction"
            ]
          },
          {
            "title": "feature-image-half-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "feature-image-half-1"
              },
              "titleText": {
                "type": "string"
              },
              "subtitleText": {
                "type": "string"
              },
              "leftImageUrl": {
                "type": "null"
              },
              "rightImageUrl": {
                "type": "string"
              }
            },
            "required": [
              "background",
              "titleText",
              "subtitleText",
              "leftImageUrl",
              "rightImageUrl"
            ]
          },
          {
            "title": "feature-boxes-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "feature-boxes-1"
              },
              "titleText": {
                "type": "string"
              },
              "subtitleText": {
                "type": "string"
              },
              "features": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {},
                    "background": {},
                    "iconId": {
                      "type": "string"
                    },
                    "imageUrl": {
                      "type": "string"
                    },
                    "title": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "title",
                    "description"
                  ]
                }
              }
            },
            "required": [
              "titleText",
              "subtitleText",
              "features"
            ]
          },
          {
            "title": "testimonial-cards-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "testimonial-cards-1"
              },
              "titleText": {
                "type": "string"
              },
              "subtitleText": {
                "type": "string"
              },
              "cards": {
                "type": "array",
                "items": [
                  {
                    "type": "object",
                    "properties": {
                      "id": {},
                      "background": {},
                      "author": {
                        "type": "string"
                      },
                      "text": {
                        "type": "string"
                      },
                      "url": {
                        "type": "string"
                      },
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "author",
                      "text",
                      "url",
                      "type"
                    ]
                  }
                ]
              }
            },
            "required": [
              "titleText",
              "subtitleText",
              "background",
              "cards"
            ]
          },
          {
            "title": "faq-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "faq-1"
              },
              "titleText": {
                "type": "string"
              },
              "subtitleText": {
                "type": "null"
              },
              "questions": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {},
                    "background": {},
                    "questionText": {
                      "type": "string"
                    },
                    "answerText": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "questionText",
                    "answerText"
                  ]
                }
              }
            },
            "required": [
              "titleText",
              "subtitleText",
              "questions"
            ]
          },
          {
            "title": "signup-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "signup-1"
              },
              "titleText": {
                "type": "string"
              },
              "subtitleText": {
                "type": "null"
              },
              "inputType": {
                "type": "string"
              },
              "inputPlaceholderText": {
                "type": "string"
              },
              "inputButtonText": {
                "type": "string"
              },
              "inputSuccessMessageText": {
                "type": "null"
              },
              "inputName": {
                "type": "string"
              },
              "formTarget": {
                "type": "string"
              },
              "formAction": {
                "type": "string"
              }
            },
            "required": [
              "titleText",
              "subtitleText",
              "background",
              "inputType",
              "inputPlaceholderText",
              "inputButtonText",
              "inputSuccessMessageText",
              "inputName",
              "formTarget",
              "formAction"
            ]
          },
          {
            "title": "footer-1",
            "type": "object",
            "allOf": [{"$ref": "#/definitions/section"}],
            "additionalProperties": false,
            "properties": {
              "id": {},
              "background": {},
              "type": {
                "const": "footer-1"
              }
            },
            "required": [
            ]
          }
        ]
      }
    }
  }
}
