import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import instance from "../shared/Request";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardActionArea, useTheme } from "@mui/material";
import Loading from "../component/Loading";

export default function SaveProducts() {

    // 로딩
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const state = useLocation().state;
    const { selectedProducts } = state.selectedProducts;
    const { siteType } = state.siteType;

    const [selectCount, setSelectCount] = useState(0);
    const [selectedSaveProducts, setSelectedSaveProducts] = useState([]);

    // siteType추가하기 일단은 for문으로 추가 but 나중에는 siteType을 하나만 보내도록 리팩토링 예정
    const data = selectedProducts.map(function (selectedProduct) {
        let newObject = selectedProduct;
        newObject.siteType = siteType;
        return newObject;
    });

    const [saveProducts, setSaveProducts] = useState([]);

    const getSaveProducts = async () => {
        setOpen(true);
        try {
            const response1 = await instance.post('/api/crawler/products', data);
            if (response1.status == 200) {
                const response2 = await instance.get('/api/products');
                setSaveProducts(response2.data);
            }
        } catch (error) {
            console.log(error);
        }
        setOpen(false);
    };

    useEffect(() => {
        // mount
        console.log("마운트");
        getSaveProducts();
        return() => {
            // unmount
            console.log("언마운트");
          }
    }, []);

    const selectSaveProductClick = (e) => {
        const targetIndex = e.target.getAttribute('data-seq');
        setSelectedSaveProducts(selectedSaveProducts => [...selectedSaveProducts, saveProducts[targetIndex]]);
        setSelectCount(selectCount + 1)
        // 카드 테두리 진하게 기능 추가하기
    };

    const registerProductClick = () => {
        setOpen(true);
        console.log("registerProductClick 호출");
        console.log("setSelectedSaveProducts : " + JSON.stringify(setSelectedSaveProducts))
        selectedSaveProducts.map(function (selectedSaveProduct) {
            const productId = selectedSaveProduct.productId;
            console.log("productId : " + productId);
            registerProducts(productId);
        });
        setOpen(false);
    }
    const registerProducts = async (productId) => {
        try {
            const response1 = await instance.get(`/api/products/${productId}`);
            if (response1.status == 200) {
                let data = response1.data;
                data.siteType = siteType;
                console.log("response1 data : " + data);
                const response2 = await instance.post(`/api/products/${productId}`, data);
                if (response2.status == 200) {
                    alert("등록 완료");
                    window.location.href = "http://localhost:3000/product";
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <Loading open={open} theme={theme}/>
            <Container sx={{ py: 8, marginTop: '50px' }} maxWidth="md">
                <div style={{
                    position: "fixed",
                    top: "75px",
                    width: "100%",
                    left: "0",
                    right: "0",
                    padding: "0 280px",
                    paddingTop: "30px",
                    zIndex: "1",
                    backgroundColor: "white",
                }}>
                    <Link
                        state={{
                            selectedProducts: { selectedProducts },
                            siteType: { siteType }
                        }}>
                        <Button id="register-product"
                            onClick={ registerProductClick }
                            variant="contained"
                            style={{
                                height: "42px",
                                width: "308px",
                                marginBottom: "20px"
                            }}>상품 등록하기
                        </Button>
                    </Link>
                    <div style={{
                        height: "30px",
                        width: "100%",
                        borderBottom: "1px solid #ECEBEF",
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "space-between",

                    }}>
                        <Button id="register-product"
                            variant="contained"
                            style={{
                                height: "20px",
                                width: "100px",
                            }}>전체 선택
                        </Button>
                        <div><span style={{ color: "red", fontWeight: "bold" }}>{selectCount}</span><span> 개 선택</span></div>
                    </div>
                </div>
                <Grid container spacing={4} style={{ marginTop: "80px" }}>
                    {saveProducts.map((saveProduct, index) => (
                        <Grid item key={saveProduct.productId} xs={12} sm={6} md={4}>
                            <CardActionArea onClick={selectSaveProductClick}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    id={"card-" + saveProduct.productId}
                                    data-seq={index}
                                >
                                    <CardMedia
                                        id={"thumbnail-image-" + saveProduct.productId}
                                        data-seq={index}
                                        component="img"
                                        image={saveProduct.thumbnailImageUrl}
                                        alt=""
                                    />
                                    <CardContent sx={{ flexGrow: 1 }} id={"card-content-" + saveProduct.productId} data-seq={index}>
                                        <Typography id={"product-name-" + saveProduct.productId} data-seq={index}>
                                            {saveProduct.productName}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    );
}