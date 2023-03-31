#!/bin/bash
cd /usr/share/nginx/html 
git pull origin main
yarn install &&
yarn build &&
pm2 restart edmy