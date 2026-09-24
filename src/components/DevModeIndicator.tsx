// import React from 'react';
// import { isDevModeEnabled, getMockUser, switchDevModeRole } from '../utils/devMode';
//
// /**
//  * Development Mode Indicator Component
//  *
//  * Displays a visual indicator when development mode is enabled.
//  * Shows the current mock user role and provides quick role switching.
//  *
//  * Only renders when VITE_DEV_MODE=true
//  */
// export const DevModeIndicator: React.FC = () => {
//   if (!isDevModeEnabled()) {
//     return null;
//   }
//
//   const mockUser = getMockUser();
//   const [isOpen, setIsOpen] = React.useState(false);
//
//   return (
//     <div
//       style={{
//         position: 'fixed',
//         bottom: '20px',
//         right: '20px',
//         zIndex: 9999,
//       }}
//     >
//       {/* Main Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           padding: '10px 15px',
//           backgroundColor: '#ff9800',
//           color: 'white',
//           border: 'none',
//           borderRadius: '50px',
//           cursor: 'pointer',
//           fontWeight: 'bold',
//           fontSize: '12px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           transition: 'all 0.3s ease',
//         }}
//         title="Dev Mode Indicator - Click to toggle menu"
//       >
//         ⚙️ Dev Mode
//       </button>
//
//       {/* Popup Menu */}
//       {isOpen && (
//         <div
//           style={{
//             position: 'absolute',
//             bottom: '65px',
//             right: 0,
//             backgroundColor: 'white',
//             border: '2px solid #ff9800',
//             borderRadius: '8px',
//             boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
//             padding: '12px',
//             minWidth: '200px',
//           }}
//         >
//           {/* Current User Info */}
//           <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #eee' }}>
//             <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#999', fontWeight: 'bold' }}>
//               CURRENT USER
//             </p>
//             <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#333' }}>
//               <strong>{mockUser.firstName} {mockUser.lastName}</strong>
//             </p>
//             <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>
//               Role: <strong style={{ color: '#ff9800' }}>{mockUser.role}</strong>
//             </p>
//             <p style={{ margin: '0', fontSize: '11px', color: '#999' }}>
//               Email: {mockUser.email}
//             </p>
//           </div>
//
//           {/* Role Switcher */}
//           <div style={{ marginBottom: '12px' }}>
//             <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#999', fontWeight: 'bold' }}>
//               SWITCH ROLE
//             </p>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//               {(['JOB_SEEKER', 'RECRUITER', 'ADMIN'] as const).map(role => (
//                 <button
//                   key={role}
//                   onClick={() => {
//                     switchDevModeRole(role);
//                     setIsOpen(false);
//                   }}
//                   style={{
//                     padding: '8px 12px',
//                     backgroundColor: mockUser.role === role ? '#4CAF50' : '#f0f0f0',
//                     color: mockUser.role === role ? 'white' : '#333',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontSize: '12px',
//                     fontWeight: mockUser.role === role ? 'bold' : 'normal',
//                     transition: 'all 0.2s ease',
//                   }}
//                 >
//                   {role === 'JOB_SEEKER' ? '👤' : role === 'RECRUITER' ? '💼' : '👨‍💼'} {role}
//                 </button>
//               ))}
//             </div>
//           </div>
//
//           {/* Info */}
//           <div style={{
//             marginTop: '12px',
//             paddingTop: '12px',
//             borderTop: '1px solid #eee',
//             fontSize: '11px',
//             color: '#999',
//             lineHeight: '1.4',
//           }}>
//             <p style={{ margin: '0' }}>
//               🔓 <strong>Dev Mode Enabled</strong> - JWT authentication is bypassed
//             </p>
//             <p style={{ margin: '4px 0 0 0' }}>
//               📖 <a href="/docs/DEV_MODE_GUIDE.md" target="_blank" rel="noopener noreferrer" style={{ color: '#0099ff' }}>
//                 See Dev Mode Guide
//               </a>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
//
