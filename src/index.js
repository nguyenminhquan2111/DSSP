import {
  callApi,
  // getListProduct,
  // deleteProductById,
  // addProduct,
  // getProductById,
  // updateProductById,
} from "./utils/callAPI.js";
import Product from "./models/product.js";

const getEle = (id) => document.getElementById(id);
const getInfo = () => {
  const id = getEle("maSP").value;
  const tenSP = getEle("tenSP").value;
  const gia = getEle("gia").value;
  const hinhAnh = getEle("hinhAnh").value;

  const product = new Product(id, tenSP, gia, hinhAnh);
  return product;
};

const renderHTML = () => {
  const content = `
  <div class="card text-white bg-dark">
      <div class="card-body">
        <h4 class="card-title">Danh sách sản phẩm</h4>
        <div class="container">
          <form>
            <div class="row">
              <div class="col-md-3">
                <input id="maSP" class="form-control" placeholder="Mã SP" disabled/>
              </div>
              <div class="col-md-3">
                <input id="tenSP" class="form-control" placeholder="Tên SP" />
              </div>
              <div class="col-md-3">
                <input id="gia" class="form-control" placeholder="Giá" />
              </div>
              <div class="col-md-3">
                <input id="hinhAnh" class="form-control" placeholder="Link hình"/>
              </div>
            </div>
            <br />
            <button id="btnThem" type="submit" class="btn btn-success">Thêm sản phẩm</button>
            <button id="btnCapNhat" type="button" class="btn btn-success" style="display:none">Cập nhật</button>
          </form>
          </div>
      </div>
    </div>
    <div class="container table__container">
        <div class="loader" id="loader"></div>
        <table class="table" id="table">
            <thead>
            <tr>
                <th>Mã SP</th>
                <th>Tên SP</th>
                <th>Giá</th>
                <th>Hình ảnh</th>
                <th></th>
            </tr>
            </thead>
            <tbody id="tblDanhSachSanPham"></tbody>
        </table>
    </div>
  `;

  getEle("root").innerHTML = content;
};

const renderTable = (arr) => {
  let tableHTML = "";
  arr.forEach((item) => {
    tableHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.tenSP}</td>
            <td>${item.gia}</td>
            <td><img src="${item.hinhAnh}" width="80px"/></td>
            <td>
              <button class="btn btn-info" onclick="editProduct(${item.id})">Sửa</button>
              <button class="btn btn-danger" onclick="deleteProduct(${item.id})">Xóa</button>
            </td>
        </tr>
    `;
  });
  getEle("tblDanhSachSanPham").innerHTML = tableHTML;
};
const showListProduct = () => {
  getEle("loader").style.display = "block";
  getEle("table").style.opacity = 0;
  callApi("SanPham", "GET", null)
    .then((res) => {
      getEle("loader").style.display = "none";
      getEle("table").style.opacity = 1;
      renderTable(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteProduct = (id) => {
  callApi(`SanPham/${id}`, "DELETE", null)
    .then(() => {
      showListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
};

renderHTML();
showListProduct();

const editProduct = (id) => {
  getEle("btnCapNhat").style.display = "inline-block";
  callApi(`SanPham/${id}`, "GET", null)
    .then((res) => {
      getEle("maSP").value = res.data.id;
      getEle("tenSP").value = res.data.tenSP;
      getEle("gia").value = res.data.gia;
      getEle("hinhAnh").value = res.data.hinhAnh;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * thêm SP
 */
getEle("btnThem").addEventListener("click", (event) => {
  //Chặn load lại trang
  event.preventDefault();
  const newProduct = getInfo();

  console.log(newProduct);
  callApi("SanPham", "POST", newProduct)
    .then(() => {
      showListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * Cập nhật SP
 */
getEle("btnCapNhat").addEventListener("click", () => {
  const updatedProduct = getInfo();

  callApi(`SanPham/${updatedProduct.id}`, "PUT", updatedProduct)
    .then(() => showListProduct())
    .catch((err) => console.log(err));
});

/**
 * 3 trạng thái
 * pending
 * reject
 * result
 */

window.deleteProduct = deleteProduct;
window.editProduct = editProduct;
