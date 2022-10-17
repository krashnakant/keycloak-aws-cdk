FROM quay.io/keycloak/keycloak:19.0.3 as builder

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_FEATURES=token-exchange
ENV KC_DB=mysql

ENV KC_CACHE_CONFIG_FILE=cache-ispn-jdbc-ping.xml
COPY ./cache-ispn-jdbc-ping.xml /opt/keycloak/conf/cache-ispn-jdbc-ping.xml
RUN rm -f /opt/keycloak/conf/cache-ispn.xml
RUN /opt/keycloak/bin/kc.sh build --db=mysql
RUN /opt/keycloak/bin/kc.sh show-config

FROM quay.io/keycloak/keycloak:19.0.3
COPY --from=builder /opt/keycloak/ /opt/keycloak/
COPY --from=builder /opt/keycloak/conf/cache-ispn-jdbc-ping.xml /opt/keycloak/conf

WORKDIR /opt/keycloak
# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:auth.dev.smartpaxonline.com" -keystore conf/server.keystore
# change these values to point to a running postgres instance
ENV KC_HOSTNAME=auth.dev.smartpaxonline.com
EXPOSE 8080
EXPOSE 8443
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
