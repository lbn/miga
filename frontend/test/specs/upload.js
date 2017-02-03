describe("upload", function() {
	describe("text", function() {
    it("should upload text article and get redirected to its URL", function() {
        browser.url("/upload");

				browser.click("a#upload-tab-2"); // Text tab
				browser.waitForVisible("#formTitle", 5000);

				let title = "En una iglesia cantan por equivocación una canción de Tupac";

				browser.setValue("#formTitle", title);
				browser.setValue("#formText", "Un coro de una iglesia situada en Sri Lanka, imprimió por error una letra del conocido y fallecido rapero Tupac. La canción que debería recitar era el Ave María pero realmente cantaron “Hail May”. Todo fue un error de la imprenta que realizó los folletos en los que se incluían las canciones. Los feligreses no se dieron cuenta del fallo hasta que empezaron a cantar la melodía, con la consiguiente reacción de incredulidad, especialmente entre las ancianas.");
				browser.submitForm("#formUploadText");

				expect(browser.getUrl()).to.match(/\/article\/(\d+)\/original$/);
				expect(browser.getText("h3")).to.equal(title);
    });
	});
	describe("url", function() {
    it("should upload article by URL and get redirected to its URL", function() {
        browser.url("/upload");

				browser.click("a#upload-tab-1"); // URL tab
				browser.waitForVisible("#formURL", 5000);

				let title = "Paulina Rubio usa el hashtag de Selectividad #PAU2015 creyendo que tenía que ver con ella";

				browser.setValue("#formURL", "http://www.20minutos.es/noticia/2484692/0/paulina-rubio/pau2015/examen-selectividad/");
				browser.submitForm("#formUploadURL");

				expect(browser.getUrl()).to.match(/\/article\/(\d+)\/original$/);
				expect(browser.getText("h3")).to.equal(title);
    });
	});
});
