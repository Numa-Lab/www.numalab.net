if [ $1 = ".jpg" ] ; then
echo "$1"
elif [ $1 = ".png" ] ; then
echo "$1"
elif [ $1 = ".jpeg" ] ; then
echo "$1"
elif [ $1 = ".tiff" ] ; then
echo "$1"
elif [ $1 = ".html" ] ; then
  bundle exec jekyll serve
  exit 1
elif [ $1 = ".md" ] ; then
  bundle exec jekyll serve
  exit 1
else
  exit 1
fi

echo `sudo apt-get install webp`などで、インストールしないとエラーが発生して動作しないよ
cwebp -lossless `dirname $2`/`basename $2` -o `dirname $2`/`basename $2 $1`".webp"