{{#floors}}
    <div class="floor-wrap">
        <div class="floor-swap1">
            <a href="./list.html?categoryId={{id}}" class="hd">
                <h2>F${{num}} {{title}}</h2>
            </a>
        </div>
        <div class="floor-product ">
            <ul class="prouct-list clearfix">
                {{#products}}
                <li class="product-item col-1 col-gap">
                    <a href="./detail.html?productId={{_id}}">
                        <img  width="180px" height="180px" src="{{mainImage}}" alt="{{name}}"> 
                            <p class="product-name">{{name}}</p>
                        <div class="product-price-number">
                            <span class="product-price">&yen;{{price}}</span>
                            <span class="product-number">{{payNums}}人已购买</span>
                        </div>
                    </a>
                </li>
                {{/products}}
            </ul>
        </div>
    </div>
{{/floors}}