#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly husky_skip_init=1
  readonly hook_name="$0"
  debug "starting $hook_name..."
fi
