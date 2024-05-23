import { ModalOpportunityProvider } from '@/modules/sales/components/modals/opportunity';
import { TableUpdateOpportunity } from './table-updateOpportunity';

export default function ListUpdateOpportunityPage() {
  return (
    <ModalOpportunityProvider>
      <TableUpdateOpportunity />
    </ModalOpportunityProvider>
  );
}
