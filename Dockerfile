FROM jetty:jre8
MAINTAINER Peter Harman <peter.harman@cae.tech>

ARG WARFILE
ADD target/${WARFILE} /var/lib/jetty/webapps/ROOT.war
