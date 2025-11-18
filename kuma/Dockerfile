FROM louislam/uptime-kuma:1

# Port explicite pour Render
ENV PORT=3001
EXPOSE 3001

# Désactive le WebSocket (fix Render 502 / infinite loading)
ENV DISABLE_WEBSOCKET=true

# Healthcheck pour que Render soit content
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/ || exit 1

VOLUME /app/data