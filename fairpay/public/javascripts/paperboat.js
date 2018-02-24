window.getParents = function ( elem, selector ) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Setup parents array
	var parents = [];

	// Get matching parent elements
	for ( ; elem && elem !== document; elem = elem.parentNode ) {

		// Add matching parents to array
		if ( selector ) {
			if ( elem.matches( selector ) ) {
				parents.push( elem );
			}
		} else {
			parents.push( elem );
		}

	}

	return parents;

};


document.addEventListener('DOMContentLoaded', function(e) {
    var pb = document.getElementById('paperboat');
    if (pb) {
        pb.addEventListener('click', function(e) {
            var parent = getParents(pb, '.paperboat');
            if (parent[0]) {
                parent[0].classList.add('paperboat--sos');
            }
            setTimeout(function() {
                swal({
                    title: 'Arrgh!',
                    text: 'You sank my boat. May I fold a new one?',
                    showCancelButton: false,
                    confirmButtonColor: '#FF705D',
                    confirmButtonText: 'Aye!',
                    imageUrl: '//rostock-ahoi.de/assets/img/paperboat-icon.svg',
                    imageWidth: 100,
                    reverseButtons: true,
                    allowOutsideClick: false,
                    imageHeight: 100
                }).then((result) => {
                    parent[0].classList.remove('paperboat--sos');
                });
            }, 3500);
        });
    }
});
