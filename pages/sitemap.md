---
title: サイトマップ
permalink: /sitemap
description: サイトマップ
---

## サイトマップ

- **[{{ 'sitemap.txt' | replace:'index.html','' | prepend: site.baseurl | prepend: '.' }}]({{ 'sitemap.txt' | replace:'index.html','' | prepend: site.baseurl | prepend: '.' }})**

{% assign collections = site.collections | where_exp:'collection','collection.output != false' %}{% for collection in collections %}{% assign docs = collection.docs | where_exp:'doc','doc.sitemap != false' %}{% for doc in docs %}
- [{{ doc.url | replace:'/index.html','/' | xml_escape | prepend: '.' }}]({{ doc.url | replace:'/index.html','/' | xml_escape | prepend: '.' }})
  {% endfor %}{% endfor %}{% assign pages = site.html_pages | where_exp:'doc','doc.sitemap != false' | where_exp:'doc','doc.url != "/404.html"' %}{% for page in pages %}
- [{{ page.url | replace:'/index.html','/' | xml_escape | prepend: '.' }}]({{ page.url | replace:'/index.html','/' | xml_escape | prepend: '.' }})
  {% endfor %}{% assign static_files = page.static_files | where_exp:'page','page.sitemap != false' | where_exp:'page','page.name != "404.html"' %}{% for file in static_files %}
- [{{ file.path | replace:'/index.html','/' | xml_escape | prepend: '.' }}]({{ file.path | replace:'/index.html','/' | xml_escape | prepend: '.' }})
  {% endfor %}
