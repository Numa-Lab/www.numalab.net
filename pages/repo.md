---
title: GitHub Repositories
permalink: /repo
description: リポジトリリスト
layout: page
background: grey
---

## Numa-Lab GitHub Repositories

**[https://github.com/Numa-Lab](https://github.com/Numa-Lab)**

{% for repository in site.github.public_repositories %}

### {% if repository.archived == true %}<i class="fa-solid fa-box-archive"></i>{%- else -%}{% if repository.fork == true -%}<i class="fa-solid fa-code-fork"></i>{%- else -%}<i class="fa-solid fa-code"></i>{% endif %}{% endif %} [{{ repository.name }}]({{ repository.html_url }})

{{ repository.description }}

    License  : {{ repository.license.name }}
    Language : {{ repository.language }}
    Created at {{ repository.created_at }}
    Pushed  at {{ repository.pushed_at }}

    stargazers_count: {{ repository.stargazers_count }}, watchers_count: {{ repository.watchers_count }}, forks_count: {{ repository.forks_count }}, open_issues_count: {{ repository.open_issues_count }}

{% endfor %}
