#!/bin/bash
# sudo amazon-linux-extras list | grep nginx
# sudo amazon-linux-extras enable nginx1
# sudo yum clean metadata
# sudo yum install -y nginx
set -e
yum update -y
# pm2 update
curl --silent --location https://rpm.nodesource.com/setup_16.x | bash -
yum -y install nodejs
npm install pm2 -g
npm install yarn -g

# pm2 start yarn --name edmy -- start -p 3000