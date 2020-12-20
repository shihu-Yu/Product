<li class="product-item col-1 col-gap">
    {{#products}}
    <a href="./detail.html?productId={{_id}}>
        <img  width="180px" height="180px" src="{{mainImage}}"> 
            <p class="product-name">{{name}}</p>
        <div class="product-price-number">
            <span class="product-price">&yen;{{price}}</span>
            <span class="product-number">{{payNums}}人已购买</span>
        </div>
    </a>
    {{/products}}
</li>