import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add state variable
  const [isLoading, setIsLoading] = useState(false);

  // Modify fetchCategories function
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'http://localhost:5000/auth/api/category/categories'
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  // Add state variable
const [isLoading, setIsLoading] = useState(false);

// Modify fetchCategories function
const fetchCategories = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('http://localhost:5000/auth/api/category/categories');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCategories(data);
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        setIsLoading(false);
    }
};

// Add to JSX before category listing
{isLoading ? (
    <div className="loading-spinner">Loading categories...</div>
) : (
    // existing category display code
)}

// Add reset function
const resetForm = () => {
    if (name || description) {
        if (window.confirm('Are you sure you want to clear the form?')) {
            setName('');
            setDescription('');
            setEditId(null);
        }
    }
};



  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/auth/api/category/categories'
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        if (!validateForm()) return;
    try {
      const url = editId
        ? `http://localhost:5000/auth/api/category/categories/${editId}`
        : 'http://localhost:5000/auth/api/category/categories';
      const method = editId ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      setName('');
      setDescription('');
      setEditId(null);
      fetchCategories();
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setDescription(category.description);
    setEditId(category.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(
          `http://localhost:5000/auth/api/category/categories/${id}`,
          {
            method: 'DELETE',
          }
        );
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
);




  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(147, 51, 234);
    doc.text('Category Registry', 14, 15);

    const tableColumn = ['ID', 'Name', 'Description', 'Created', 'Updated'];
    const tableRows = categories.map((category) => [
      category.id,
      category.name,
      category.description,
      new Date(category.created_at).toLocaleString(),
      new Date(category.updated_at).toLocaleString(),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      headStyles: { fillColor: [147, 51, 234] },
      alternateRowStyles: { fillColor: [245, 243, 255] },
    });

    doc.save('category_registry.pdf');
  };

  const [errors, setErrors] = useState({});

const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (name.length > 50) newErrors.name = 'Name must be less than 50 characters';
    if (description.length > 200) newErrors.description = 'Description must be less than 200 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

// Modify handleSubmit




// Add to form JSX
<div className="input-module">
    <input
        className={`data-input ${errors.name ? 'input-error' : ''}`}
        // ... existing input props
    />
    {errors.name && <span className="error-message">{errors.name}</span>}
</div>


  return (
    <div className="category-portal">
      <nav className="cosmic-nav">
        <h1 className="portal-title">Category Portal</h1>
        <button onClick={() => navigate('/login')} className="exit-pod">
          Exit Portal
        </button>
      </nav>

      <div className="control-center">
        <div className="mission-control">
          <h1 className="control-header">Control Center</h1>
          <form onSubmit={handleSubmit} className="data-entry">
            <div className="input-module">
              <label className="data-label">Category Designation</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter designation"
                className="data-input"
              />
            </div>
            <div className="input-module">
              <label className="data-label">Data Stream</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter data stream"
                className="data-stream"
              />
            </div>
            <button type="submit" className="launch-btn">
              {editId ? 'Update Transmission' : 'Launch Category'}
            </button>
          </form>
          <button onClick={generatePDF} className="report-generator">
            Generate Data Report
          </button>
        </div>

        

        <div className="data-grid">
          <h2 className="grid-header">Data Registry</h2>
          <div className="category-nodes">
            {categories.length === 0 ? (
              <div className="no-data-signal">
                No signals detected in registry
              </div>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="data-node">
                  <div className="node-info">
                    <span className="node-id">ID: {category.id}</span>
                    <span className="node-name">{category.name}</span>
                    <span className="node-desc">
                      {category.description || 'No data stream'}
                    </span>
                    <span className="node-time">
                      Created: {new Date(category.created_at).toLocaleString()}
                    </span>
                    <span className="node-time">
                      Updated: {new Date(category.updated_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="node-controls">
                    <button
                      onClick={() => handleEdit(category)}
                      className="modify-btn"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="terminate-btn"
                    >
                      Terminate
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
