import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'

import { biggerClass } from './style'

const test = [
  {
    "page_block": "selected_articles",
    "widget_settings": [
      {
        "type": "article-finder",
        "name": "articles",
        "value": [
          1
        ],
        "settings": {
          "formats": []
        }
      }
    ],
    "language": "de",
    "result": [
      {
        "id": 1,
        "date": "2018-01-22T14:33:35",
        "date_gmt": "2018-01-22T13:33:35",
        "guid": {
          "rendered": "http:\/\/localhost:8181\/?p=1"
        },
        "modified": "2018-01-22T14:33:35",
        "modified_gmt": "2018-01-22T13:33:35",
        "slug": "hallo-welt",
        "status": "publish",
        "type": "post",
        "link": "http:\/\/localhost:8181\/2018\/01\/22\/hallo-welt\/",
        "title": {
          "rendered": "Hallo Welt!"
        },
        "content": {
          "rendered": "<p>Willkommen zur deutschen Version von WordPress. Dies ist der erste Beitrag. Du kannst ihn bearbeiten oder l\u00f6schen. Und dann starte mit dem Schreiben!<\/p>\n",
          "protected": false
        },
        "excerpt": {
          "rendered": "<p>Willkommen zur deutschen Version von WordPress. Dies ist der erste Beitrag. Du kannst ihn bearbeiten oder l\u00f6schen. Und dann starte mit dem Schreiben!<\/p>\n",
          "protected": false
        },
        "author": 1,
        "featured_media": 0,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "template": "",
        "format": "standard",
        "meta": [],
        "categories": [
          1
        ],
        "tags": [],
        "post_format": [],
        "_links": {
          "self": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/posts\/1"
            }
          ],
          "collection": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/posts"
            }
          ],
          "about": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/types\/post"
            }
          ],
          "author": [
            {
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/users\/1"
            }
          ],
          "replies": [
            {
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/comments?post=1"
            }
          ],
          "version-history": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/posts\/1\/revisions"
            }
          ],
          "wp:attachment": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/media?parent=1"
            }
          ],
          "wp:term": [
            {
              "taxonomy": "category",
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/categories?post=1"
            },
            {
              "taxonomy": "post_tag",
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/tags?post=1"
            },
            {
              "taxonomy": "post_format",
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/post_format?post=1"
            }
          ],
          "curies": [
            {
              "name": "wp",
              "href": "https:\/\/api.w.org\/{rel}",
              "templated": true
            }
          ]
        }
      }
    ]
  },
  {
    "page_block": "selected_articles",
    "widget_settings": [
      {
        "type": "article-finder",
        "name": "articles",
        "value": [
          1
        ],
        "settings": {
          "formats": []
        }
      }
    ],
    "language": "de",
    "result": [
      {
        "id": 1,
        "date": "2018-01-22T14:33:35",
        "date_gmt": "2018-01-22T13:33:35",
        "guid": {
          "rendered": "http:\/\/localhost:8181\/?p=1"
        },
        "modified": "2018-01-22T14:33:35",
        "modified_gmt": "2018-01-22T13:33:35",
        "slug": "hallo-welt",
        "status": "publish",
        "type": "post",
        "link": "http:\/\/localhost:8181\/2018\/01\/22\/hallo-welt\/",
        "title": {
          "rendered": "Hallo Welt!"
        },
        "content": {
          "rendered": "<p>Willkommen zur deutschen Version von WordPress. Dies ist der erste Beitrag. Du kannst ihn bearbeiten oder l\u00f6schen. Und dann starte mit dem Schreiben!<\/p>\n",
          "protected": false
        },
        "excerpt": {
          "rendered": "<p>Willkommen zur deutschen Version von WordPress. Dies ist der erste Beitrag. Du kannst ihn bearbeiten oder l\u00f6schen. Und dann starte mit dem Schreiben!<\/p>\n",
          "protected": false
        },
        "author": 1,
        "featured_media": 0,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "template": "",
        "format": "standard",
        "meta": [],
        "categories": [
          1
        ],
        "tags": [],
        "post_format": [],
        "_links": {
          "self": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/posts\/1"
            }
          ],
          "collection": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/posts"
            }
          ],
          "about": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/types\/post"
            }
          ],
          "author": [
            {
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/users\/1"
            }
          ],
          "replies": [
            {
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/comments?post=1"
            }
          ],
          "version-history": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/posts\/1\/revisions"
            }
          ],
          "wp:attachment": [
            {
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/media?parent=1"
            }
          ],
          "wp:term": [
            {
              "taxonomy": "category",
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/categories?post=1"
            },
            {
              "taxonomy": "post_tag",
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/tags?post=1"
            },
            {
              "taxonomy": "post_format",
              "embeddable": true,
              "href": "http:\/\/localhost:8181\/wp-json\/wp\/v2\/post_format?post=1"
            }
          ],
          "curies": [
            {
              "name": "wp",
              "href": "https:\/\/api.w.org\/{rel}",
              "templated": true
            }
          ]
        }
      }
    ]
  }
]

@Component
export class Home extends Vue {
  @Getter('message') public message

  public render(h) {
    return (
      <div class='container-fluid'>
        <pagemanager-renderer blocks={test} />
        <div class='row'>
          <div class='col'>
            <div class={biggerClass}>
              {this.message}
            </div >
          </div>
        </div>
      </div>
    )
  }
}
