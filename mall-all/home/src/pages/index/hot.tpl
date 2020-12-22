<ul class="product-list col-4">
    {{#products}}
    <li class="product-item col-1 col-gap">
        <a href="./detail.html?productId={{_id}}">
            <img class="product-img" src="{{mainImage}}" alt="{{name}}" />
            <p class="product-name">{{name}}</p>
            <p class="product-price-number">
                <span class="product-price">&yen;{{price}}</span>
                <span class="product-number">{{payNums}}人已购买</span>
            </p>
        </a>
    </li>
    {{/products}}
</ul>
