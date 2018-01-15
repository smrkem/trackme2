# RoR Docker Template

## How to use it:
This uses the latest postgres and the ruby:2.31 images. Pull these down if need be:  
```
$ docker pull postgres
$ docker pull ruby:2.3.1
```  

Clone or unzip the repo into a folder with name of the new app.

Build the initial rails app on your host using the docker ruby image:  
```
$ docker run --rm -it -v $PWD:/appname ruby:2.3.1 bash
```
you might need to add user argument on linux: `-u $(id -u):$(id -g)`.  Replace `appname`.

And then the usual commands inside the container.
- `# cd /appname`
- `# gem install rails`
- `# rails new . --skip-bundle --skip-test --skip-spring --skip-turbolinks -d postgresql`

There should be a new rails app in the folder, with the dockerfiles at the root level of the project.

Optionally update the gemfile to your preference and pin nokogiri to the version you want (1.7.1 in the repo - change to latest if desired).

Next update the .env file with your chosen db creds, and update the `config/database.yml` settings:
```
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: db
  username: <%= ENV["POSTGRES_USER"] %>
  password: <%= ENV["POSTGRES_PASSWORD"] %>

development:
  <<: *default
  database: appname_development

test:
  <<: *default
  database: appname_test

production:
  <<: *default
  database: appname_production
  host: <%= ENV["POSTRES_HOST"] %>
```
so that it uses the postgres container and environment variables.

Now run the containers to set up the db and create the intial 'schema.rb'. If this is the first time, they'll get build first which takes a little while.
```
docker-compose run --rm app rake db:create db:migrate
```
and it should give some successful output, like that it created a couple dbs.

If all that went ok - you can start up the app with `docker-compose up -d` (-d for daemonize in the background) and stop it with `docker-compose stop`.
