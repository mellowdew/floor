FROM debian:buster
MAINTAINER Wouter Admiraal <wad@wadmiraal.net>
ENV DEBIAN_FRONTEND noninteractive
ENV DRUPAL_VERSION 8.6.2

# Install packages.
RUN apt-get update
RUN apt-get install -y \
	vim \
	git \
	apache2 \
	php-cli \
	php-mysql \
	php-gd \
	php-curl \
	php-bcmath \
	php-dom \
	php-mbstring \
        php-memcache \
	libapache2-mod-php \
	curl \
	default-mysql-client \
	wget \
	unzip \
	cron \
        gnupg \
	supervisor \
        imagemagick

RUN apt-get clean

# Setup PHP.
RUN sed -i 's/display_errors = Off/display_errors = On/' /etc/php/7.3/apache2/php.ini
RUN sed -i 's/display_errors = Off/display_errors = On/' /etc/php/7.3/cli/php.ini

# Setup Apache.
# In order to run our Simpletest tests, we need to make Apache
# listen on the same port as the one we forwarded. Because we use
# 8080 by default, we set it up for that port.
RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
RUN sed -i 's/DocumentRoot \/var\/www\/html/DocumentRoot \/var\/www\/web/' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's/VirtualHost \*:80/VirtualHost \*:\*/' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's/CustomLog \${APACHE_LOG_DIR}\/access\.log combined/CustomLog \/proc\/self\/fd\/1 combined/' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's/ErrorLog \${APACHE_LOG_DIR}\/error\.log/ErrorLog \/proc\/self\/fd\/2/' /etc/apache2/sites-available/000-default.conf

RUN echo '<VirtualHost localhost:80>\n\
  ServerName status.localhost\n\
  <Location /server-status>\n\
    SetHandler server-status\n\
  </Location>\n\
</VirtualHost>\n\
' > /etc/apache2/sites-available/00_status-vhost.conf

RUN a2enmod rewrite
RUN a2ensite 00_status-vhost.conf


# Setup Supervisor.
RUN echo '[program:apache2]\ncommand=/bin/bash -c "source /etc/apache2/envvars && exec /usr/sbin/apache2 -DFOREGROUND"\nautorestart=true\nstdout_logfile=/dev/stdout\nstdout_logfile_maxbytes=0\nstderr_logfile=/dev/stderr\nstderr_logfile_maxbytes=0\n\n' >> /etc/supervisor/supervisord.conf
RUN echo '[program:cron]\ncommand=cron -f\nautorestart=false \n\n' >> /etc/supervisor/supervisord.conf

# Setup Opcache.
RUN echo "opcache.revalidate_freq = 0" >> /etc/php/7.3/mods-available/opcache.ini
RUN echo "opcache.enable_file_override = 1" >> /etc/php/7.3/mods-available/opcache.ini
RUN echo "opcache.max_wasted_percentage = 10" >> /etc/php/7.3/mods-available/opcache.ini
RUN echo "opcache.interned_strings_buffer = 16" >> /etc/php/7.3/mods-available/opcache.ini
RUN echo "opcache.fast_shutdown = 1" >> /etc/php/7.3/mods-available/opcache.ini


# Install Composer.
RUN curl -sS https://getcomposer.org/installer > composer-installer && \
    php composer-installer --version=1.10.17
RUN mv composer.phar /usr/local/bin/composer

# Install Drush 9.
RUN composer global require drush/drush:9.*
RUN composer global update
# Unfortunately, adding the composer vendor dir to the PATH doesn't seem to work. So:
RUN ln -s /root/.composer/vendor/bin/drush /usr/local/bin/drush

# Install Drupal Console. There are no stable releases yet, so set the minimum
# stability to dev.
#RUN curl https://drupalconsole.com/installer -L -o drupal.phar && \
#	mv drupal.phar /usr/local/bin/drupal && \
#	chmod +x /usr/local/bin/drupal
#RUN  /usr/local/bin/drupal init

# Install Drupal.
RUN  rm -rf /var/www && \
     mkdir -p /var/www
RUN composer --version
COPY . /var/www/

RUN  cd /var/www && \
     composer install && \
     composer drupal-scaffold

RUN chmod -R 777 /var/www/web/sites/default/files

EXPOSE 80
CMD echo "cim"; /usr/local/bin/drush -r /var/www/web -y cim ; echo "cr" ; /usr/local/bin/drush -r /var/www/web cr ; echo "supervisor" ; exec supervisord -n
