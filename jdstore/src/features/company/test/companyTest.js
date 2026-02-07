// Simple test to validate company feature functionality
// This is a basic manual test to verify the API works correctly

import { companyService } from '../services/companyService';

// Example usage of the company service
async function testCompanyOperations() {
  console.log('Testing Company Operations...\n');
  
  // Test creating a company
  console.log('1. Creating a new company...');
  try {
    const newCompany = await companyService.create({
      company_name: 'Test Company',
      status: 'Active',
      company_profile_json: JSON.stringify({
        industry: 'Technology',
        employees: 100,
        founded: 2020
      })
    });
    
    if (newCompany.success) {
      console.log('✓ Company created successfully:', newCompany.data.name);
      const companyId = newCompany.data.name;
      
      // Test fetching the created company
      console.log('\n2. Fetching the created company...');
      const fetchedCompany = await companyService.fetchById(companyId);
      if (fetchedCompany.success) {
        console.log('✓ Company fetched successfully:', fetchedCompany.data.company_name);
      } else {
        console.error('✗ Failed to fetch company:', fetchedCompany.error);
      }
      
      // Test updating the company
      console.log('\n3. Updating the company...');
      const updatedCompany = await companyService.update(companyId, {
        status: 'Inactive',
        company_profile_json: JSON.stringify({
          industry: 'Technology',
          employees: 120,
          founded: 2020,
          location: 'Hanoi'
        })
      });
      
      if (updatedCompany.success) {
        console.log('✓ Company updated successfully');
      } else {
        console.error('✗ Failed to update company:', updatedCompany.error);
      }
      
      // Test fetching all companies
      console.log('\n4. Fetching all companies...');
      const allCompanies = await companyService.fetchAll();
      if (allCompanies.success) {
        console.log(`✓ Fetched ${allCompanies.data.length} companies`);
      } else {
        console.error('✗ Failed to fetch companies:', allCompanies.error);
      }
      
      // Test deleting the company
      console.log('\n5. Deleting the test company...');
      const deletedCompany = await companyService.delete(companyId);
      if (deletedCompany.success) {
        console.log('✓ Company deleted successfully');
      } else {
        console.error('✗ Failed to delete company:', deletedCompany.error);
      }
      
    } else {
      console.error('✗ Failed to create company:', newCompany.error);
    }
  } catch (error) {
    console.error('✗ Error during company operations:', error.message);
  }
  
  console.log('\nTest completed.');
}

// Uncomment the line below to run the test
// testCompanyOperations();

export { testCompanyOperations };