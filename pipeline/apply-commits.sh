# this script should run in the inner repo, make sure that you are in the root directory
# and you are on the branch that you want to apply the commits to
# usage: in terminal run ./commits-transfer/apply-commits.sh
tar -xzf ../white/patches.tar.gz -C ../

git am ../patches/*.patch
