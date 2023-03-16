import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import instance from '../shared/Request';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardActionArea } from "@mui/material";
import Loading from "../component/Loading";
import { useTheme } from '@mui/material/styles';

export default function GetProducts() {

    // 로딩
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const [products, setProducts] = useState([]);
    const [selectCount, setSelectCount] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const state = useLocation().state;
    const { siteUrl } = state.siteUrl;
    const { pageNum } = state.pageNum;
    const { siteType } = state.siteType;

    const getProducts = async () => {
        setOpen(true);
        const response = await instance.get(`/api/crawler/products?siteUrl=${siteUrl}&pageNum=${pageNum}&siteType=${siteType}`)
            .catch(error => {
                alert("불러오기 실패");
                window.location.href = "http://localhost:3000/product"
            });
        setProducts(response.data);
        setOpen(false);
    };

    useEffect(() => {
        // mount
        console.log("마운트");
        getProducts();
        return() => {
            // unmount
            console.log("언마운트");
          }
    }, []);

    // 한 번 더 클릭 시 해제하기 기능 추가하기
    const selectProductClick = (e) => {
        const imageTagId = e.target.getAttribute('id');
        const [targetIndex] = imageTagId.split("-").slice(-1);
        setSelectedProducts(selectedProducts => [...selectedProducts, products[targetIndex]]);
        setSelectCount(selectCount + 1)
        // 카드 테두리 진하게 기능 추가하기
    };
    
    // 전체 선택 기능 추가하기
    // 전체 해제 기능 추가하기

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
                    <Link to={"/products/save"}
                        state={{
                            selectedProducts: { selectedProducts },
                            siteType: { siteType }
                        }}>
                        <Button id="register-product"
                            variant="contained"
                            style={{
                                height: "42px",
                                width: "308px",
                                marginBottom: "20px"
                            }}>상품 저장하기
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
                    {products.map((product, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <CardActionArea onClick={selectProductClick}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    id={"card-" + index}
                                >
                                    <CardMedia
                                        id={"thumbnail-image-" + index}
                                        component="img"
                                        image={product.thumbnailImageUrl}
                                        alt=""
                                    />
                                    <CardContent sx={{ flexGrow: 1 }} id={"card-content-" + index}>
                                        <Typography id={"product-name-" + index}>
                                            {product.productName}
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