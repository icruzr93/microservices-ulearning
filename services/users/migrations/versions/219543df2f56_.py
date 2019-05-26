"""empty message

Revision ID: 219543df2f56
Revises: 89fa1f16c775
Create Date: 2019-05-26 21:49:02.529886

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '219543df2f56'
down_revision = '89fa1f16c775'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('admin', sa.Boolean(), nullable=True))
    op.execute('UPDATE users SET admin=False')
    op.alter_column('users', 'admin', nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'admin')
    # ### end Alembic commands ###
