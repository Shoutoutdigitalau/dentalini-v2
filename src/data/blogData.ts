export const blogData = [
  {
    "id": 11,
    "documentId": "ic81m6h377to56bx650z5v42",
    "title": "How do I know if I need root canal treatment?",
    "slug": "how-do-i-know-if-i-need-root-canal-treatment",
    "content": [
      {
        "type": "paragraph",
        "children": [
          {
            "text": "Root canal is the space in the root of a tooth which houses the nerves, blood and tissues. It is the 'live' part of the tooth. The root canal is extension of the pulp chamber, so it is also called pulp canal.",
            "type": "text"
          }
        ]
      }
    ],
    "tags": "tips",
    "createdAt": "2025-09-03T11:26:53.944Z",
    "updatedAt": "2025-12-24T08:02:55.086Z",
    "publishedAt": "2025-12-24T08:02:55.144Z",
    "excerpt": "Root canal is the space in the root of a tooth which houses the nerves, blood and tissues. It is the 'live' part of the tooth. The root canal is extension of the pulp chamber, so it is also called pulp canal.",
    "thumbnail": {
      "url": "/uploads/DSC_1014_567a7966af.JPG",
      "alternativeText": "Root Canal Treatment"
    }
  },
  {
    "id": 8,
    "documentId": "tcg65k12qim0idg1v3w5pok0",
    "title": "Quality Dentistry",
    "slug": "quality-dentistry",
    "content": [
      {
        "type": "paragraph",
        "children": [
          {
            "text": "Providing quality treatment and patient care is our primary focus. Our experience and state-of–the-art technology means that we can provide all our patients with high quality dentistry which is also affordable.",
            "type": "text"
          }
        ]
      }
    ],
    "tags": "tips",
    "createdAt": "2025-09-03T11:29:39.649Z",
    "updatedAt": "2025-09-18T05:17:35.776Z",
    "publishedAt": "2025-09-18T05:17:35.807Z",
    "excerpt": "Providing quality treatment and patient care is our primary focus. Our experience and state-of–the-art technology means that we can provide all our patients with high quality dentistry which is also affordable.",
    "thumbnail": {
      "url": "/uploads/thumbnail_shutterstock_99252095_f9815a30c3.jpg",
      "alternativeText": "Quality Dentistry"
    }
  },
  {
    "id": 7,
    "documentId": "whvk5ngypile5hg4lcrg491d",
    "title": "What is the Child Dental Benefits Schedule?",
    "slug": "what-is-the-child-dental-benefits-schedule",
    "content": [
      {
        "type": "paragraph",
        "children": [
          {
            "text": "The Child Dental Benefits Schedule is a new Medicare Initiative which now allows eligible children between the ages of 2 and 17years, access to basic dental services. Services include:",
            "type": "text"
          }
        ]
      },
      {
        "type": "list",
        "format": "unordered",
        "children": [
          {
            "type": "list-item",
            "children": [
              {
                "text": "Teeth cleaning",
                "type": "text"
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "text": "Root canal treatment",
                "type": "text"
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "text": "X-rays",
                "type": "text"
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "text": "Fissure sealing",
                "type": "text"
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "text": "Fillings",
                "type": "text"
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "text": "Extractions",
                "type": "text"
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "text": "The CDBS will not cover any orthodontic work or cosmetic dentistry",
                "type": "text"
              }
            ]
          }
        ]
      }
    ],
    "tags": "tips",
    "createdAt": "2025-09-03T10:53:08.916Z",
    "updatedAt": "2025-09-18T05:16:18.281Z",
    "publishedAt": "2025-09-18T05:16:18.351Z",
    "excerpt": "The Child Dental Benefits Schedule is a new Medicare Initiative which now allows eligible children between the ages of 2 and 17years, access to basic dental services.",
    "thumbnail": {
      "url": "/uploads/thumbnail_shutterstock_70216339_4e189babd2.jpg",
      "alternativeText": "Child Dental Benefits"
    }
  }
];

export function getBlogPostsStatic() {
  return {
    data: blogData,
    meta: {
      pagination: {
        page: 1,
        pageSize: 9,
        pageCount: 1,
        total: blogData.length
      }
    }
  };
}

export function getBlogPostStatic(slug: string) {
  const post = blogData.find(p => p.slug === slug);
  return {
    data: post ? [post] : []
  };
}
