1. Avoir un compte git

2. Pour placer le repo dans le dossier que vous souhaitez, il faut d'abord se déplacer là où vous voulez. Exemple : "cd C:/user/Documents"

3. En ligne de commande, taper : "git clone https://github.com/CTomm/ProjetLeaflet.git". Et voilà vous avez les fichiers !

4. Quand vous avez fait des modifs sur un fichier existants : 
    4.1 En ligne de commande, aller dans le dossier où vous avez cloné le repo. Exemple : "cd C:/user/Documents/ProjetLeaflet"
    4.2. Taper "git commit -m "Description rapide de mes modifs"
    4.3. Taper "git push" -> c'est là où ça part vraiment sur github

5. Quand vous avez fait des modifs sur un nouveau fichier : 
    4.1 En ligne de commande, aller dans le dossier où vous avez cloné le repo. Exemple : "cd C:/user/Documents/ProjetLeaflet"
    5.2. Taper "git add MonNouveauFichier.js"
    5.3. Taper "git commit -m "Description rapide de mes modifs"
    5.4. Taper "git push" -> c'est là où ça part vraiment sur github

6. Quand quelqu'un d'autre a fait des modifs :
    6.1 En ligne de commande, aller dans le dossier où vous avez cloné le repo. Exemple : "cd C:/user/Documents/ProjetLeaflet"
    6.2 Taper "git pull"
