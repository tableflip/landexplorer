export default (str) => (str + '').toLowerCase().replace(/[^a-z0-9]/gi, '-')
