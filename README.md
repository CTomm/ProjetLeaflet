##Présentation

**Objectif** : créer une webcarto représentant, les lignes de métro, les stations auto-partage et le taux de chômage par IRIS à Lyon.

**Utilisation** : ouvrir le fichier `evaluation/HTML_metro_autoP.html` dans un navigateur.

**Libraries utilisées** : 
- [Leaflet](https://leafletjs.com/) pour tout apprendre à partir de Zéro !Leaflet : permet de créer et paramétrer la cartographie
- [Animated Marker](https://github.com/openplans/Leaflet.AnimatedMarker) : permet de gérer l’animation des - markers le long des lignes de métro
- [Bootstrap](https://getbootstrap.com/) : permet de structurer le document html
- [JQuery](https://jquery.com/) : permet de créer de l’interactivité sur les boutons, utilisé pour  particulièrement pour la paramétrage de fenêtre “Modal”.

*Auteurs* : Gonon Léonie, Mok Yan Kiu, Tommasi Chloé. Étudiantes en Géomatique, Master Géographies Numériques, promo 2020.

##Notice d'utilisation du repository pour les collaborateurs
1. Avoir un compte git

2. Pour placer le repo dans le dossier que vous souhaitez, il faut d'abord se déplacer là où vous voulez. Exemple : "cd C:/user/Documents"

3. En ligne de commande, taper : "git clone https://github.com/CTomm/ProjetLeaflet.git". Et voilà vous avez les fichiers !

4. Quand vous avez fait des modifs : 
    4.1 En ligne de commande, aller dans le dossier où vous avez cloné le repo. Exemple : "cd C:/user/Documents/ProjetLeaflet"
    4.2. Taper "git add MonFicher.js"
    4.3. Taper "git commit -m "Description rapide de mes modifs"
    4.4. Taper "git push" -> c'est là où ça part vraiment sur github
    4.5. Entrer ses identifiants GitHub

5. Quand quelqu'un d'autre a fait des modifs :
    5.1 En ligne de commande, aller dans le dossier où vous avez cloné le repo. Exemple : "cd C:/user/Documents/ProjetLeaflet"
    5.2 Taper "git pull"

6. À tout moment, on peut taper "git status" pour connaitre l'état de notre répertoire local par rapport au repo en ligne
