describe('flipkartProductSearch', () => {

    beforeEach(()=>{
        cy.visit("https://www.flipkart.com/")
        cy.get('header').find('picture').then(($e)=>{
            expect($e.prop('title')).to.eq('Flipkart')
        })
    })

    it('Get Product details', () => {
        let productLink;
        let productName;
        let productPrice;
        cy.get("input[title=\"Search for Products, Brands and More\"]").type("Motorola edge 50 fusion 128GB").type("{enter}")
        let clicked = false;
        cy.get('div[class="cPHDOP col-12-12"]').find("a").each(($el) => {
            cy.wrap($el).invoke('attr', 'href').then((href) => {
                if (!clicked && href.includes('motorola-edge-50-fusion') && href.includes('marshmallow-blue-128-gb')) {
                    productLink = href;  // Store the product link
                    clicked = true;
                    // Remove the target attribute and click outside the within block
                    cy.wrap($el).invoke('removeAttr', 'target').click();
                }
            });
        });
        cy.get(".VU-ZEz").contains('Motorola Edge 50 Fusion (Marshmallow Blue, 128 GB)').invoke('text').then((text)=>{
            productName=text

        });
        cy.get('div[class="Nx9bqj CxhGGd"]').contains('22,999').invoke('text').then((text)=>{
            productPrice=text

        });

        cy.then(() => {
            // Ensure productName, productPrice, and productLink are available before writing
            if (productName && productPrice && productLink) {
                cy.writeFile('cypress/fixtures/Flipkart-ProductDetail.json', {
                    productname: productName,
                    productprice: productPrice,
                    productlink: productLink
                });
            } else {
                cy.log('Product details are missing. Ensure elements are correctly selected.');
            }
        });
    })


})