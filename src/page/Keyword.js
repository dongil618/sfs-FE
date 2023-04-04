import { Button, TextField, Box, Alert, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useRef } from 'react';
import instance from '../shared/Request';
import Loading from "../component/Loading";

export default function Keyword() {

    // loading
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    // alert
    const [alert, setAlert] = useState(false);

    const [keywords, setKeywords] = useState('');
    const keywordList = useRef([]);
    const [dataGridColumns, setDataGridColumns] = useState([]);
    const [dataGridRows, setDataGridRows] = useState([]);

    const keywordsChange = (e) => {
        setKeywords(e.target.value);
    }

    const getKeywordMatchCategoryClick = () => {
        // 키워드 입력란 초기화
        keywordList.current = [];

        if (keywords.length == 0) {
            alert("키워드를 입력해 주세요.");
        }
        let keywordsTemp = keywords;
        const lastChar = keywordsTemp.charAt(keywordsTemp.length - 1);
        if (lastChar != ",") {
            keywordsTemp += ",";
        }

        const keywordCnt = keywordsTemp.split(",").length;
        if (keywordCnt == 1 || keywordCnt == 2) {
            alert("키워드를 2개 이상 입력해 주세요.");
        }

        getKeywordMatchCategory();
    }

    const getKeywordMatchCategory = async () => {
        setOpen(true);
        const response = await instance.get(`/api/keyword/match-category?keywords=${keywords}`)
            .catch(error => {
                console.log(error);
                setOpen(false);
            })
        const dataList = response.data;
        dataList.forEach(data => {
            keywordList.current = [...keywordList.current, data];
        })

        let categoryDict = new Map();
        keywordList.current.forEach(keyword => {
            if (categoryDict.has(keyword['naverShoppingCategory'])) {
                const cnt = categoryDict.get(keyword['naverShoppingCategory']) + 1;
                categoryDict.set(keyword['naverShoppingCategory'], cnt);
            } else {
                categoryDict.set(keyword['naverShoppingCategory'], 1);
            }
        })

        if (categoryDict.size === 1) {
            setAlert(true);
            setKeywords("");
            // 키워드 입력란 초기화
            keywordList.current = [];
        }
        setDataGridColumn();
        setDataGridRow();
        setOpen(false);
    }

    // data grid config
    const setDataGridColumn = () => {
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'keyword', headerName: '키워드', width: 300 },
            { field: 'naverShoppingCategory', headerName: '카테고리', width: 300 },
            { field: 'monthlyPcQcCnt', headerName: 'PC 검색량', width: 100 },
            { field: 'monthlyMobileQcCnt', headerName: '모바일 검색량', width: 100 },
            { field: 'monthlyTotalQcCnt', headerName: '총 검색량', width: 100 },
        ];
        setDataGridColumns(columns);
    }

    const setDataGridRow = () => {

        const rows = keywordList.current.map((keyword, idx) => {
            let newRow = {};
            newRow.id = idx + 1;
            newRow.keyword = keyword['keyword'];
            newRow.naverShoppingCategory = keyword['naverShoppingCategory'];
            newRow.monthlyPcQcCnt = keyword['monthlyPcQcCnt'];
            newRow.monthlyMobileQcCnt = keyword['monthlyMobileQcCnt'];
            newRow.monthlyTotalQcCnt = keyword['monthlyPcQcCnt'] + keyword['monthlyMobileQcCnt'];
            return newRow;
        });
        setDataGridRows(rows);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };

    useEffect(() => {
        setDataGridColumn();
    }, []);

    return (
        <div className="content" style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "120px",
            height: "100%",
            padding: "0 200px",
            width: "100%",
            alignItems: "center"
        }}>
            <Loading open={open} theme={theme} />
            <h2>카테고리 매칭</h2>
            <TextField
                fullWidth
                size="small"
                id="category-match"
                placeholder="키워드 입력 (콤마로 구분)"
                style={{
                    marginTop: "30px"
                }}
                onChange={keywordsChange}
                value={keywords}
            />
            <Button id="get-match-category"
                variant="contained"
                style={{
                    height: "42px",
                    width: "308px",
                    marginTop: "15px"
                }}
                onClick={getKeywordMatchCategoryClick}
            > 체크하기
            </Button>
            {
                keywordList.current.length > 0 &&
                <Box sx={{ height: '300px', width: '100%' }}>
                    <DataGrid style={{
                        marginTop: "50px"
                    }} rows={dataGridRows} columns={dataGridColumns} pageSize={5} />
                </Box>
            }
            <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    카테고리가 모두 일치합니다!
                </Alert>
            </Snackbar>
        </div>
    );
}