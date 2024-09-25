describe('SearchProduct', () => {
    let productLink;
    let productName;
    let productPrice;
    it('visit Amazon.in', () => {
        cy.visit("https://www.amazon.in/")
        cy.title().should('contain','Amazon.in')

    })

    it('search product titan watch', () => {
        cy.visit("https://www.amazon.in/")
        cy.get("#twotabsearchtextbox").type("Motorola edge 50 fusion 128GB").type("{enter}")
        cy.get("span[class=\"a-size-medium a-color-base a-text-normal\"]").contains("Motorola Edge 50 Fusion 5G").contains("128GB").parent().then((e)=>{
            productLink=e.prop("href")
        }).invoke("removeAttr","target").click()
        cy.get("#productTitle").then((e)=>{
            productName=e.text()
        })
        cy.get("#corePriceDisplay_desktop_feature_div").find("span[class=\"a-price-whole\"]").then((e)=>{
            productPrice=e.text()
        })
        cy.go('back')
        cy.get("span[class=\"a-size-medium a-color-base a-text-normal\"]").contains("Motorola Edge 50 Fusion 5G").contains("128GB").parentsUntil('.puisg-col-inner').find('button').click()
        cy.get("#nav-cart-count").should("contain.text","1");
        cy.get("#nav-cart-count-container").click()

    });

    after(()=>{
        cy.writeFile('cypress/fixtures/Amazon-ProductDetail.json', { productname: productName, productprice: productPrice, productlink: productLink })
    })
})