#!/bin/bash

# 配置信息
SERVER_HOST="us.f1y0.cc"
SERVER_USER="root"
DEPLOY_PATH="/var/www/f1y0.cc"
GIT_REPO="git@github.com:silentbird/f1y0.cc.git"  # 例如：git@github.com:your-username/f1y0.cc.git

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}开始部署...${NC}"

# 在服务器上拉取最新代码并构建
echo -e "${GREEN}正在更新代码并构建...${NC}"
ssh ${SERVER_USER}@${SERVER_HOST} -p 5022 "cd ${DEPLOY_PATH} && \
    git pull && \
    npm install && \
    npm run build && \
    sudo systemctl restart nginx"

if [ $? -ne 0 ]; then
    echo -e "${RED}部署失败！${NC}"
    exit 1
fi

echo -e "${GREEN}部署完成！${NC}"