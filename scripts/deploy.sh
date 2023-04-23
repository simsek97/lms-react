#!/bin/bash
cd /usr/share/nginx/html 
git pull origin main
yarn install &&
yarn build &&
yarn migrate &&
pm2 restart edmy