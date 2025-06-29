import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Box, Alert } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../contexts/AuthContext';

const StaffFieldListPage = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      try {
        // Gọi API lấy danh sách sân mà nhân viên này phụ trách
        // Giả sử API nhận staffId qua query param hoặc từ token
        const res = await axiosInstance.get('/api/football/get-football-by-staff');
        if (!res.data.isSuccess) throw new Error('Không thể lấy danh sách sân bóng');
        setFields(res.data.result || []);
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách sân bóng.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchFields();
  }, [user]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={700} color="success.main" gutterBottom textAlign="center">Chọn sân để thêm lịch sân</Typography>
      <Grid container spacing={4} justifyContent="center">
        {fields.map(field => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={field.maSanBong}>
            <Card sx={{ width: 240, height: 220, display: 'flex', flexDirection: 'column', boxShadow: 3, mx: 'auto' }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                <Box>
                  <Typography variant="h6" color="success.main" fontWeight={600} sx={{ fontSize: 18, mb: 1 }}>{field.tenSanBong}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{field.diaChi}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, fontWeight: 700, letterSpacing: 1, borderRadius: 2, boxShadow: 2 }}
                  onClick={() => navigate(`/staff/fields/${field.maSanBong}`)}
                >
                  ĐẶT SÂN
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StaffFieldListPage; 