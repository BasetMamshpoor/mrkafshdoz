pm2 list
pm2 delete mrkafshdoz
git clone https://github.com/BasetMamshpoor/mrkafshdoz.git
cd mrkafshdoz/
cd /home/mrkafshdoz
rm -rf mrkafshdoz/
pm2 start npm --name "mrkafshdoz" -- start
rm -rf Components/ pages/ styles/
sudo systemctl restart httpd