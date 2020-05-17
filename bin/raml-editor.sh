[ -f "${0%/*}/../node_modules/api-designer/dist/index.html" ] || (cd ${0%/*} && npm install)
${0%/*}/../raml-editor.js "$@"
