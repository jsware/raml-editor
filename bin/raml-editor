script="$(readlink "$0")"
[ -f "${script%/*}/../node_modules/api-designer/dist/index.html" ] || (cd ${script%/*} && npm install)
${script%/*}/../raml-editor.js "$@"
