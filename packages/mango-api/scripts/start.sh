#!/bin/bash

# Check Templeton TOKEN
if [[ $SSM_TOKEN ]]; then
  export MANGO_TOKEN=${SSM_TOKEN}
fi

# Check Templeton SECRET
if [[ $SSM_SECRET ]]; then
  export MANGO_SECRET=${SSM_SECRET}
fi

# Check Templeton WP
if [[ $SSM_WP ]]; then
  export MANGO_WP=${SSM_WP}
fi

# Check for Plugins
if [[ $SSM_PLUGINS ]]; then
  # install needed plugins
  IFS=',' read -r -a plugins <<< "${SSM_PLUGINS}"
  for plugin in "${plugins[@]}"; do
    npm install --only production @axelspringer/mango-plugin-${plugin}
  done

  export MANGO_PLUGINS=${SSM_PLUGINS}
fi

# Execute mango-api
exec ./bin/mango-api
