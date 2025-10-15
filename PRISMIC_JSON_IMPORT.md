# Prismic Custom Types - JSON for Import

Copy and paste these JSON snippets directly into the Prismic JSON editor for each custom type.

---

## Settings (Singleton Type)

```json
{
  "Main": {
    "site_title": {
      "type": "Text",
      "config": {
        "label": "Site Title",
        "placeholder": "Enter site title"
      }
    },
    "site_description": {
      "type": "StructuredText",
      "config": {
        "label": "Site Description",
        "placeholder": "Enter site description",
        "allowTargetBlank": true,
        "multi": "paragraph,strong,em,hyperlink"
      }
    },
    "color_primary": {
      "type": "Color",
      "config": {
        "label": "Primary Color",
        "placeholder": "#0b1120"
      }
    },
    "color_secondary": {
      "type": "Color",
      "config": {
        "label": "Secondary Color",
        "placeholder": "#1f2937"
      }
    },
    "color_accent": {
      "type": "Color",
      "config": {
        "label": "Accent Color",
        "placeholder": "#f97316"
      }
    },
    "font_primary": {
      "type": "Text",
      "config": {
        "label": "Primary Font",
        "placeholder": "Space Grotesk, Inter, sans-serif"
      }
    },
    "font_secondary": {
      "type": "Text",
      "config": {
        "label": "Secondary Font",
        "placeholder": "Fraunces, Georgia, serif"
      }
    }
  }
}
```

---

## Navigation (Singleton Type)

```json
{
  "Main": {
    "items": {
      "type": "Group",
      "config": {
        "label": "Navigation Items",
        "fields": {
          "label": {
            "type": "Text",
            "config": {
              "label": "Label",
              "placeholder": "Menu item label"
            }
          },
          "link": {
            "type": "Link",
            "config": {
              "label": "Link",
              "placeholder": "Link URL",
              "allowTargetBlank": true
            }
          }
        }
      }
    },
    "social_links": {
      "type": "Group",
      "config": {
        "label": "Social Links",
        "fields": {
          "platform": {
            "type": "Text",
            "config": {
              "label": "Platform",
              "placeholder": "e.g., LinkedIn"
            }
          },
          "url": {
            "type": "Link",
            "config": {
              "label": "URL",
              "placeholder": "Social profile URL",
              "allowTargetBlank": true
            }
          }
        }
      }
    }
  }
}
```

---

## Project (Repeatable Type)

```json
{
  "Main": {
    "uid": {
      "type": "UID",
      "config": {
        "label": "UID",
        "placeholder": "project-slug"
      }
    },
    "title": {
      "type": "Text",
      "config": {
        "label": "Title",
        "placeholder": "Project title"
      }
    },
    "summary": {
      "type": "StructuredText",
      "config": {
        "label": "Summary",
        "placeholder": "Brief project description",
        "allowTargetBlank": true,
        "multi": "paragraph,strong,em,hyperlink"
      }
    },
    "cover": {
      "type": "Image",
      "config": {
        "label": "Cover Image",
        "constraint": {},
        "thumbnails": []
      }
    }
  },
  "Details": {
    "services": {
      "type": "Group",
      "config": {
        "label": "Services",
        "fields": {
          "label": {
            "type": "Text",
            "config": {
              "label": "Service",
              "placeholder": "e.g., Product Design"
            }
          }
        }
      }
    },
    "roles": {
      "type": "Group",
      "config": {
        "label": "Roles",
        "fields": {
          "label": {
            "type": "Text",
            "config": {
              "label": "Role",
              "placeholder": "e.g., Principal Designer"
            }
          }
        }
      }
    },
    "year": {
      "type": "Number",
      "config": {
        "label": "Year",
        "placeholder": "2024"
      }
    },
    "client": {
      "type": "Text",
      "config": {
        "label": "Client",
        "placeholder": "Client name"
      }
    },
    "duration": {
      "type": "Text",
      "config": {
        "label": "Duration",
        "placeholder": "e.g., 6 months"
      }
    },
    "metrics": {
      "type": "Group",
      "config": {
        "label": "Metrics",
        "fields": {
          "label": {
            "type": "Text",
            "config": {
              "label": "Metric Label",
              "placeholder": "e.g., User Engagement"
            }
          },
          "value": {
            "type": "Text",
            "config": {
              "label": "Value",
              "placeholder": "e.g., +40%"
            }
          },
          "context": {
            "type": "Text",
            "config": {
              "label": "Context",
              "placeholder": "Additional context"
            }
          }
        }
      }
    }
  }
}
```

---

## Post (Repeatable Type)

```json
{
  "Main": {
    "uid": {
      "type": "UID",
      "config": {
        "label": "UID",
        "placeholder": "post-slug"
      }
    },
    "title": {
      "type": "Text",
      "config": {
        "label": "Title",
        "placeholder": "Post title"
      }
    },
    "excerpt": {
      "type": "StructuredText",
      "config": {
        "label": "Excerpt",
        "placeholder": "Brief post excerpt",
        "allowTargetBlank": true,
        "multi": "paragraph,strong,em,hyperlink"
      }
    },
    "publish_date": {
      "type": "Date",
      "config": {
        "label": "Publish Date",
        "placeholder": "Publication date"
      }
    },
    "author": {
      "type": "Text",
      "config": {
        "label": "Author",
        "placeholder": "Author name"
      }
    },
    "cover": {
      "type": "Image",
      "config": {
        "label": "Cover Image",
        "constraint": {},
        "thumbnails": []
      }
    }
  }
}
```

---

## Case Study (Repeatable Type)

```json
{
  "Main": {
    "uid": {
      "type": "UID",
      "config": {
        "label": "UID",
        "placeholder": "case-study-slug"
      }
    },
    "title": {
      "type": "Text",
      "config": {
        "label": "Title",
        "placeholder": "Case study title"
      }
    },
    "subtitle": {
      "type": "Text",
      "config": {
        "label": "Subtitle",
        "placeholder": "Brief tagline"
      }
    },
    "summary": {
      "type": "StructuredText",
      "config": {
        "label": "Summary",
        "placeholder": "Executive summary",
        "allowTargetBlank": true,
        "multi": "paragraph,strong,em,hyperlink"
      }
    },
    "cover": {
      "type": "Image",
      "config": {
        "label": "Cover Image",
        "constraint": {},
        "thumbnails": []
      }
    },
    "project": {
      "type": "Link",
      "config": {
        "label": "Related Project",
        "select": "document",
        "customtypes": ["project"]
      }
    }
  },
  "Details": {
    "challenge": {
      "type": "StructuredText",
      "config": {
        "label": "Challenge",
        "placeholder": "What problem needed solving?",
        "allowTargetBlank": true,
        "multi": "paragraph,strong,em,hyperlink,heading3,heading4,list-item,o-list-item"
      }
    },
    "approach": {
      "type": "StructuredText",
      "config": {
        "label": "Approach",
        "placeholder": "How did you solve it?",
        "allowTargetBlank": true,
        "multi": "paragraph,strong,em,hyperlink,heading3,heading4,list-item,o-list-item"
      }
    },
    "results": {
      "type": "StructuredText",
      "config": {
        "label": "Results",
        "placeholder": "What was the outcome?",
        "allowTargetBlank": true,
        "multi": "paragraph,strong,em,hyperlink,heading3,heading4,list-item,o-list-item"
      }
    },
    "year": {
      "type": "Number",
      "config": {
        "label": "Year",
        "placeholder": "2024"
      }
    },
    "client": {
      "type": "Text",
      "config": {
        "label": "Client",
        "placeholder": "Client name"
      }
    },
    "services": {
      "type": "Group",
      "config": {
        "label": "Services",
        "fields": {
          "label": {
            "type": "Text",
            "config": {
              "label": "Service",
              "placeholder": "e.g., Product Strategy"
            }
          }
        }
      }
    },
    "metrics": {
      "type": "Group",
      "config": {
        "label": "Key Metrics",
        "fields": {
          "label": {
            "type": "Text",
            "config": {
              "label": "Metric Label",
              "placeholder": "e.g., Revenue Growth"
            }
          },
          "value": {
            "type": "Text",
            "config": {
              "label": "Value",
              "placeholder": "e.g., +250%"
            }
          },
          "context": {
            "type": "Text",
            "config": {
              "label": "Context",
              "placeholder": "Additional context"
            }
          }
        }
      }
    },
    "testimonial": {
      "type": "StructuredText",
      "config": {
        "label": "Testimonial",
        "placeholder": "Client testimonial",
        "allowTargetBlank": false,
        "multi": "paragraph,strong,em"
      }
    },
    "testimonial_author": {
      "type": "Text",
      "config": {
        "label": "Testimonial Author",
        "placeholder": "Name and title"
      }
    }
  }
}
```

---

## Import Instructions

For each custom type:

1. Go to https://fairway.prismic.io
2. Navigate to **Settings → Custom Types**
3. Create new custom type:
   - **Settings**: Singleton type, ID: `settings`
   - **Navigation**: Singleton type, ID: `navigation`
   - **Project**: Repeatable type, ID: `project`
   - **Post**: Repeatable type, ID: `post`
   - **Case Study**: Repeatable type, ID: `case_study`
4. Click on the **JSON editor** tab
5. Copy the JSON from above
6. Paste into the editor (replacing the default `{ "Main": { } }`)
7. Click **Save**

Done! ✨
