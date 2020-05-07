export default function(domain) {
	var parts = domain.split('\/\/')[1].split('\/')[0].split('.');
	if (parts[parts.length-2].length < 3) return parts[parts.length-3] + '.' +parts[parts.length-2] + '.' + parts[parts.length-1];
	else return parts[parts.length-2] + '.' + parts[parts.length-1];
}
