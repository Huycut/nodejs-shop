const { func } = require('joi');
const db = require('../commom/sqlHelper');
const categori = function (Categori) {
    this.id = Categori.IDCate;
    this.nameCate = Categori.NameCate;
    this.meta = Categori.MetaCate;
    this.parentCate = Categori.ParentCate;
}
const product = function (Prd) {
    this.IdPrd = Prd.IdPrd;
}
const productSale = function( SaleOff,NamePrd,PricePrd,ImgPrd,MetaPrd){

    this.SaleOff = SaleOff;
    this.NamePrd = NamePrd;
    this.PricePrd = PricePrd;
    this.ImgPrd = ImgPrd;
    this.MetaPrd = MetaPrd;

}
categori.getCategori = function (result) {
    db.query("select * from categori ", function (err, data) {
        if (err) {
            console.log("Tải danh mục thất bại");
        }
        else {
            result(data);
        }
    })
};
product.getAllPrd = function (result, page) {
    let limit = 6;
    let offset = (page - 1) * limit;
    db.query("select * from product limit " + limit + " offset " + offset, function (err, data) {
        if (err) {
            console.log("Tải sản phẩm thất bại");
        }
        else {
            result(data);
        }
    })
}
categori.getProductByMeta = function (id, result, page) {
    let limit = 6;
    let offset = (page - 1) * limit;
    db.query("select * from product where ?? = ? limit " + limit + " offset " + offset, [id.by, id.id], function (err, data) {
        if (err) {
            console.log("Tải danh mục con thất bại");
        }
        else {
            result(data);
        }
    });
}
product.getDataPrd = function (meta, result) {
    db.query("SELECT * FROM product WHERE metaPrd = ?", meta, function (err, data) {
        if (err) {
            console.log("Tải dữ liệu sản phẩm thất bại");
            result(null);
        } else {
            let productData = data[0]; // Store product data
            let id = productData.IDPrd; // Get the product ID

            db.query("SELECT SaleOff FROM sale WHERE idPrd = ?", id, function (err, dataSale) {
                if (err) {
                    console.log("Lỗi khi truy vấn sale");
                    result(null);
                } else {
                    productData.SaleOff = dataSale[0]?.SaleOff || null; // Add sale info to product data
                    result(productData); // Return combined result
                }
            });
        }
    });
};
product.getColumPage = function (callback) {
    db.query('SELECT COUNT(*) AS total FROM product', (err, results) => {
        if (err) {
            console.log('Truy vấn số lượng thất bại');
            callback(err, null);
        } else {
            const count = results[0].total;
            callback(null, count);
        }
    });
}
product.getColumPageByMeta = function (value, callback) {
    db.query('SELECT COUNT(*) AS total FROM product where ?? = ?', [value.by, value.id], (err, results) => {
        if (err) {
            console.log('Truy vấn số lượng thất bại');
            callback(err, null);
        } else {
            const count = results[0].total;
            callback(null, count);
        }
    });
}
product.getReviewByPrd = function (value, call) {
    db.query(` select account.Name,reviewprd.Comment,reviewprd.Rating 
        from reviewprd 
        inner JOIN account 
        on reviewprd.IdAccount = account.IdAccount 
        inner JOIN product 
        on product.IDPrd = reviewprd.Id 
        where reviewprd.Id = ?`, value, function (err, result) {
        if (err) {
            console.log("Hiển thị đánh giá sản phẩm thất bại");
        }
        else {
            call(result);
        }
    })
}
product.insertReview = function (idAccount, idPrd, comment, stars,result) {
    db.query("INSERT INTO `reviewprd` set IdAccount = ? , Id = ? , Comment = ?, Rating = ?", [idAccount, idPrd, comment, stars], function (err) {
        if (err) {
            console.log("thêm đánh giá thất bại");
        }
    });
}
product.getRatingReivew = function (idPrd,result) {
    db.query('select Rating from reviewPrd where Id = ?',idPrd ,function (err, data) {
        if (err) {
            console.log('xuất dữ liệu rating thất bại');
        } else {
            let dataRating = {
                '1stars': 0,
                '2stars': 0,
                '3stars': 0,
                '4stars': 0,
                '5stars': 0
            };
    
            for (let i = 1; i <= 5; i++) {
                data.forEach(function (value) {
                    if (i === value.Rating) {
                        dataRating[i + 'stars'] += 1;
                    }
                });
            }
    
            result(dataRating);
        }
    });
}
db.query(`select sale.SaleOff,product.NamePrd,product.PricePrd,product.ImgPrd,product.MetaPrd 
    from sale 
    inner join 
    product 
    on sale.idPrd = product.IDPrd`,function(err,data){
    if(err){
        console.log('xuất sản phẩm sale thất bại');
    }else{
         product.productsOnSale = data.map(item => 
            new productSale(item.SaleOff, item.NamePrd, item.PricePrd, item.ImgPrd, item.MetaPrd)
        );
    }
})



module.exports = { categori, product};