import { Button, Slider, TextField, Divider } from '@mui/material';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function Product() {

    const [siteUrl, setSiteUrl] = useState('');
    const [pageNum, setPageNum] = useState(1);
    const [siteType, setSiteType] = useState(0);

    const pageNumChange = (e) => {
        setPageNum(e.target.value);
    };

    const siteUrlChange = (e) => {
        setSiteUrl(e.target.value);
    };


    const siteTypeChange = (e) => {
        setSiteType(e.target.value);
    };

    return (
        <div className="content" style={{
            display: "inline-flex",
            flexWrap: "wrap",
            marginTop: "200px",
            height: "100%"
        }}>
            <h2>상품 등록</h2>
            <FormControl fullWidth sx={{marginBottom: "10px"}}>
                <InputLabel id="site-type-select-label">Site Type</InputLabel>
                <Select
                    labelId="site-type-select-label"
                    id="site-type-select"
                    value={siteType}
                    label="사이트 종류"
                    onChange={siteTypeChange}
                >
                    <MenuItem value={0}>카페24</MenuItem>
                    <MenuItem value={1}>아임웹</MenuItem>
                    <MenuItem value={2}>식스샵</MenuItem>
                </Select>
            </FormControl>
            <TextField
                required
                id="site-category-url"
                placeholder="자사몰 사이트 카테고리 URL"
                value={siteUrl}
                onChange={siteUrlChange}
            />
            <p style={{ fontWeight: "bold" }}>페이지 수</p>
            <Slider defaultValue={1} min={0} max={10} aria-label="Default" valueLabelDisplay="auto" onChange={pageNumChange} />
            <Link to={"/products"}
                state={{
                    siteUrl: { siteUrl },
                    pageNum: { pageNum },
                    siteType: { siteType },
                }}>
                <Button id="get-product"
                    variant="contained"
                    style={{
                        height: "42px",
                        width: "308px"
                    }}>상품 가져오기
                </Button>
            </Link>
        </div>
    );
}