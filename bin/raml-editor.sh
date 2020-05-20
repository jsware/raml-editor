this="$0"; while readlink "$this" >/dev/null 2>&1; do this=$(readlink "$this"); done
[ -f "${this%/*}/../node_modules/api-designer/dist/index.html" ] || (cd ${this%/*} && npm install)
${this%/*}/../raml-editor.js "$@"
