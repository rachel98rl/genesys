# genesys2017
Genesys Hackathon 2017


# To install dependencies:
```
sudo apt install python python-flask
sudo apt install apache2
```
# To deploy and run on an Ubuntu VPS:
```
cd ~/
git clone http://github.com/rachel98rl/genesys2017
sudo cp -r website /var/www/
sudo cp config/Linker.conf /etc/apache2/sites-available
cd /var/www
sudo mv website Linker
sudo a2enmod wsgi
sudo a2ensite Linker
sudo service apache2 reload
```
