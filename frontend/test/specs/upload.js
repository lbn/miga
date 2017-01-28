describe("upload", function() {
	describe("text", function() {
    it("should upload text article and get redirected to its URL", function() {
        browser.url("/upload");

				let title = "En una iglesia cantan por equivocación una canción de Tupac";

				browser.setValue("#formTitle", title);
				browser.setValue("#formText", "Un coro de una iglesia situada en Sri Lanka, imprimió por error una letra del conocido y fallecido rapero Tupac. La canción que debería recitar era el Ave María pero realmente cantaron “Hail May”. Todo fue un error de la imprenta que realizó los folletos en los que se incluían las canciones. Los feligreses no se dieron cuenta del fallo hasta que empezaron a cantar la melodía, con la consiguiente reacción de incredulidad, especialmente entre las ancianas.");
				browser.submitForm("#formUpload");

				expect(browser.getUrl()).to.match(/\/article\/(\d+)\/original$/);
				expect(browser.getText("h3")).to.equal(title);
    });
	});
});
