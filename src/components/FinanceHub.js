import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Divider,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  AccountBalance,
  CreditCard,
  ShoppingCart,
  Home,
  DirectionsCar,
  Restaurant,
  LocalHospital,
  School,
} from '@mui/icons-material';
import { format } from 'date-fns';

const FinanceHub = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'income',
      amount: 5000,
      category: 'Salary',
      description: 'Monthly salary',
      date: '2024-01-01',
      account: 'Checking',
    },
    {
      id: 2,
      type: 'expense',
      amount: 1200,
      category: 'Housing',
      description: 'Monthly rent',
      date: '2024-01-02',
      account: 'Checking',
    },
    {
      id: 3,
      type: 'expense',
      amount: 450,
      category: 'Food',
      description: 'Groceries and dining out',
      date: '2024-01-05',
      account: 'Credit Card',
    },
    {
      id: 4,
      type: 'expense',
      amount: 100,
      category: 'Transportation',
      description: 'Gas and parking',
      date: '2024-01-07',
      account: 'Checking',
    },
    {
      id: 5,
      type: 'income',
      amount: 500,
      category: 'Freelance',
      description: 'Web development project',
      date: '2024-01-10',
      account: 'Savings',
    },
  ]);

  const [budgets, setBudgets] = useState([
    { category: 'Housing', budget: 1500, spent: 1200 },
    { category: 'Food', budget: 600, spent: 450 },
    { category: 'Transportation', budget: 300, spent: 100 },
    { category: 'Entertainment', budget: 200, spent: 85 },
    { category: 'Healthcare', budget: 250, spent: 0 },
    { category: 'Education', budget: 150, spent: 0 },
  ]);

  const [open, setOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: 'Food',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    account: 'Checking',
  });

  const categoryIcons = {
    Housing: <Home />,
    Food: <Restaurant />,
    Transportation: <DirectionsCar />,
    Healthcare: <LocalHospital />,
    Education: <School />,
    Entertainment: <ShoppingCart />,
    Salary: <AccountBalance />,
    Freelance: <CreditCard />,
  };

  const accounts = ['Checking', 'Savings', 'Credit Card', 'Cash'];
  const expenseCategories = ['Housing', 'Food', 'Transportation', 'Healthcare', 'Education', 'Entertainment', 'Other'];
  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

  const calculateTotals = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  };

  const { totalIncome, totalExpenses, balance } = calculateTotals();

  const handleAddTransaction = () => {
    const newTransaction = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
    };
    setTransactions([newTransaction, ...transactions]);
    
    // Update budget tracking if it's an expense
    if (formData.type === 'expense') {
      setBudgets(budgets.map(budget => 
        budget.category === formData.category 
          ? { ...budget, spent: budget.spent + parseFloat(formData.amount) }
          : budget
      ));
    }
    
    handleClose();
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      amount: transaction.amount.toString(),
      category: transaction.category,
      description: transaction.description,
      date: transaction.date,
      account: transaction.account,
    });
    setOpen(true);
  };

  const handleUpdateTransaction = () => {
    setTransactions(transactions.map(t => 
      t.id === editingTransaction.id 
        ? { ...t, ...formData, amount: parseFloat(formData.amount) }
        : t
    ));
    handleClose();
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTransaction(null);
    setFormData({
      type: 'expense',
      amount: '',
      category: 'Food',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      account: 'Checking',
    });
  };

  const getBudgetProgress = (category) => {
    const budget = budgets.find(b => b.category === category);
    if (!budget) return 0;
    return (budget.spent / budget.budget) * 100;
  };

  const getBudgetColor = (progress) => {
    if (progress > 100) return 'error';
    if (progress > 80) return 'warning';
    return 'success';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AttachMoney sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Finance Hub
        </Typography>
      </Box>

      {/* Financial Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">Total Income</Typography>
                  <Typography variant="h4">${totalIncome.toLocaleString()}</Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 48, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'error.light', color: 'error.contrastText' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">Total Expenses</Typography>
                  <Typography variant="h4">${totalExpenses.toLocaleString()}</Typography>
                </Box>
                <TrendingDown sx={{ fontSize: 48, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            bgcolor: balance >= 0 ? 'primary.light' : 'warning.light',
            color: balance >= 0 ? 'primary.contrastText' : 'warning.contrastText'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">Balance</Typography>
                  <Typography variant="h4">
                    ${balance.toLocaleString()}
                  </Typography>
                </Box>
                <AccountBalance sx={{ fontSize: 48, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Budget Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Budget Overview
              </Typography>
              <List>
                {budgets.map((budget) => {
                  const progress = getBudgetProgress(budget.category);
                  const remaining = budget.budget - budget.spent;
                  
                  return (
                    <ListItem key={budget.category} divider>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {categoryIcons[budget.category]}
                            <Typography variant="subtitle1">
                              {budget.category}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">
                                ${budget.spent} / ${budget.budget}
                              </Typography>
                              <Typography variant="body2">
                                ${remaining} remaining
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={Math.min(progress, 100)}
                              color={getBudgetColor(progress)}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              <List>
                {transactions.slice(0, 8).map((transaction) => (
                  <ListItem key={transaction.id} divider>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {categoryIcons[transaction.category]}
                            <Typography variant="subtitle2">
                              {transaction.description}
                            </Typography>
                          </Box>
                          <Typography 
                            variant="subtitle2"
                            sx={{ 
                              color: transaction.type === 'income' ? 'success.main' : 'error.main',
                              fontWeight: 'bold'
                            }}
                          >
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip size="small" label={transaction.category} variant="outlined" />
                          <Chip size="small" label={transaction.account} />
                          <Typography variant="caption" sx={{ ml: 'auto' }}>
                            {format(new Date(transaction.date), 'MMM dd, yyyy')}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => handleEditTransaction(transaction)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        size="small"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Transaction FAB */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </Fab>

      {/* Add/Edit Transaction Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    type: e.target.value,
                    category: e.target.value === 'income' ? 'Salary' : 'Food'
                  })}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {(formData.type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Account</InputLabel>
                <Select
                  value={formData.account}
                  label="Account"
                  onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                >
                  {accounts.map((account) => (
                    <MenuItem key={account} value={account}>{account}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={editingTransaction ? handleUpdateTransaction : handleAddTransaction} 
            variant="contained"
            disabled={!formData.amount || !formData.description.trim()}
          >
            {editingTransaction ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinanceHub;
