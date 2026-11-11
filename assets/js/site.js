(function () {
	var toggle = document.querySelector(".nav-toggle");
	var nav = document.getElementById("nav");
	var links = nav.querySelectorAll("a");

	function setOpen(open) {
		nav.classList.toggle("is-open", open);
		document.body.classList.toggle("nav-open", open);
		toggle.setAttribute("aria-expanded", open ? "true" : "false");
		toggle.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
		document.body.style.overflow = open ? "hidden" : "";
	}

	toggle.addEventListener("click", function () {
		setOpen(!nav.classList.contains("is-open"));
	});

	links.forEach(function (link) {
		link.addEventListener("click", function () {
			setOpen(false);
		});
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") setOpen(false);
	});

	var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
	if ("IntersectionObserver" in window) {
		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					links.forEach(function (link) {
						var current = link.getAttribute("href") === "#" + entry.target.id;
						if (current) link.setAttribute("aria-current", "true");
						else link.removeAttribute("aria-current");
					});
				});
			},
			{ rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
		);
		sections.forEach(function (section) { observer.observe(section); });
	}
})();
